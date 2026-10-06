const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { CohereClient } = require('cohere-ai');
const ResumeModel = require('../Models/resume');
const UserModel = require('../Models/user');

const getCohereClient = () => {
    const token = process.env.COHERE_API_KEY || '9Bj8PUavcdzhDCax8Vl2lggKxAFrAefyNrUan6et';
    return new CohereClient({ token });
};

// Helper to safely extract JSON from LLM text
function parseAiResponse(rawText) {
    if (!rawText) return null;
    let cleanText = rawText.trim();

    // Remove markdown code fences if present
    if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
    }

    try {
        return JSON.parse(cleanText);
    } catch {
        // Try regex match for JSON block
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch {
                // fall through
            }
        }

        // Fallback regex extraction if model didn't return strict JSON
        const scoreMatch = cleanText.match(/(?:overallScore|score):\s*(\d+)/i);
        const atsMatch = cleanText.match(/atsScore:\s*(\d+)/i);
        const reasonMatch = cleanText.match(/(?:summary|reason|feedback):\s*([\s\S]*?)(?=\n[A-Z]|$)/i);

        return {
            overallScore: scoreMatch ? parseInt(scoreMatch[1], 10) : 65,
            atsScore: atsMatch ? parseInt(atsMatch[1], 10) : 70,
            summary: reasonMatch ? reasonMatch[1].trim() : cleanText.slice(0, 300),
            skillsMatched: [],
            skillsMissing: [],
            strengths: ['Resume submitted for evaluation'],
            improvements: ['Optimize keywords to match the target job description']
        };
    }
}

exports.addResume = async (req, res) => {
    let filePath = null;
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a PDF resume file.' });
        }

        const { job_desc } = req.body;
        if (!job_desc || job_desc.trim().length < 10) {
            return res.status(400).json({ error: 'Please provide a valid Job Description (minimum 10 characters).' });
        }

        filePath = req.file.path;
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);

        const extractedText = (pdfData.text || '').trim();
        if (extractedText.length < 30) {
            return res.status(400).json({
                error: 'Could not extract readable text from PDF. Please make sure the PDF is text-based, not an image/scanned document.'
            });
        }

        // Identify current user
        let currentUser = req.user;
        if (!currentUser && req.body.user) {
            currentUser = await UserModel.findById(req.body.user);
        }
        if (!currentUser) {
            currentUser = await UserModel.findOne();
            if (!currentUser) {
                currentUser = await UserModel.create({
                    name: 'Guest User',
                    email: 'guest@example.com',
                    role: 'user'
                });
            }
        }

        const prompt = `You are an expert HR Director and ATS (Applicant Tracking System) Specialist.
Compare the following candidate resume text with the provided Job Description (JD).
Evaluate keyword alignment, role suitability, ATS formatting compliance, and experience depth.

Resume Content:
${extractedText.slice(0, 4000)}

Job Description:
${job_desc.slice(0, 2000)}

Respond ONLY with a valid JSON object without markdown code blocks, using the exact following schema:
{
  "overallScore": <integer between 0 and 100>,
  "atsScore": <integer between 0 and 100 representing ATS keyword & formatting match>,
  "summary": "<2-4 sentences executive summary of candidate fit>",
  "skillsMatched": ["<skill1>", "<skill2>", "<skill3>"],
  "skillsMissing": ["<missingSkill1>", "<missingSkill2>"],
  "strengths": ["<strength1>", "<strength2>"],
  "improvements": ["<specific actionable recommendation 1>", "<specific actionable recommendation 2>"]
}`;

        const cohere = getCohereClient();
        const response = await cohere.chat({
            model: 'command-r-08-2024',
            message: prompt,
            temperature: 0.2
        });

        const rawText = response.text || '';
        const parsed = parseAiResponse(rawText) || {
            overallScore: 65,
            atsScore: 60,
            summary: 'Resume analyzed against job description.',
            skillsMatched: [],
            skillsMissing: [],
            strengths: ['Relevant domain experience'],
            improvements: ['Add target keywords from JD']
        };

        const newResume = new ResumeModel({
            user: currentUser._id,
            userName: currentUser.name || 'User',
            userEmail: currentUser.email || '',
            resume_name: req.file.originalname,
            job_desc: job_desc.trim(),
            score: Math.min(100, Math.max(0, Number(parsed.overallScore) || 50)),
            atsScore: Math.min(100, Math.max(0, Number(parsed.atsScore) || 50)),
            feedback: parsed.summary || 'Analysis complete.',
            skillsMatched: Array.isArray(parsed.skillsMatched) ? parsed.skillsMatched : [],
            skillsMissing: Array.isArray(parsed.skillsMissing) ? parsed.skillsMissing : [],
            strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
            improvements: Array.isArray(parsed.improvements) ? parsed.improvements : []
        });

        await newResume.save();

        return res.status(200).json({
            message: 'Your Analysis is ready',
            data: newResume
        });
    } catch (err) {
        console.error('Error in addResume:', err);
        return res.status(500).json({ error: 'Server error during resume analysis', message: err.message });
    }
};

exports.getAllResumesForUser = async (req, res) => {
    try {
        const userParam = req.params.user;
        let query = {};

        if (userParam && userParam !== 'undefined' && userParam !== 'null') {
            if (userParam.includes('@')) {
                query = { userEmail: userParam.toLowerCase() };
            } else if (userParam.match(/^[0-9a-fA-F]{24}$/)) {
                query = { user: userParam };
            }
        }

        // If no match found or query empty, check req.user
        if (Object.keys(query).length === 0 && req.user) {
            query = { user: req.user._id };
        }

        const resumes = await ResumeModel.find(query).sort({ createdAt: -1 });
        return res.status(200).json({
            message: 'Your Previous History',
            resumes
        });
    } catch (err) {
        console.error('Error in getAllResumesForUser:', err);
        return res.status(500).json({ error: 'Server error fetching history', message: err.message });
    }
};

exports.getResumeForAdmin = async (req, res) => {
    try {
        const resumes = await ResumeModel.find()
            .populate('user', 'name email photoUrl role')
            .sort({ createdAt: -1 });

        const totalResumes = resumes.length;
        const avgScore = totalResumes > 0
            ? Math.round(resumes.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalResumes)
            : 0;
        const avgAts = totalResumes > 0
            ? Math.round(resumes.reduce((acc, curr) => acc + (curr.atsScore || 0), 0) / totalResumes)
            : 0;
        const highMatches = resumes.filter(r => (r.score || 0) >= 70).length;

        return res.status(200).json({
            message: 'Fetched all History',
            stats: {
                totalResumes,
                avgScore,
                avgAts,
                highMatches
            },
            resumes
        });
    } catch (err) {
        console.error('Error in getResumeForAdmin:', err);
        return res.status(500).json({ error: 'Server error fetching admin history', message: err.message });
    }
};

exports.deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await ResumeModel.findById(id);
        if (!resume) {
            return res.status(404).json({ error: 'Resume record not found' });
        }

        // Check ownership or admin
        if (req.user && req.user.role !== 'admin' && String(resume.user) !== String(req.user._id)) {
            return res.status(403).json({ error: 'Unauthorized to delete this resume' });
        }

        await ResumeModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Resume analysis deleted successfully', id });
    } catch (err) {
        return res.status(500).json({ error: 'Server error deleting resume', message: err.message });
    }
};
