import styles from "./Dashboard.module.css";
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';


const Dashboard = () => {
return (
    <div className={styles.Dashboard}>
    <div className={styles.DashboardLeft}>
        <div className={styles.DashboardHeader}>
        <div className={styles.DashboardHeaderTitle}>
            Smart Resume Screening
        </div>
        <div className={styles.DashboardHeaderLargeTitle}>
            Resume Match Score
        </div>
        </div>

        <div className={styles.alertInfo}>
        <div>🔔 Important Instructions :</div>
        <div className={styles.dashboardInstruction}>
            <div>
            📓 Please paste the complete job description in the "Job
            Description" field before submitting.
            </div>
            <div>🔗 Only PDF format (.pdf) resumes are accepted.</div>
        </div>
        </div>

        <div className={styles.DashboardUploadResume}>
        <div className={styles.DashboardResumeBlock}>
            Upload Your Resume...
        </div>
        <div className={styles.DashboardInputField}>
            <label htmlFor="inputfield" className={styles.analyzeAIBtn}>Upload Resume</label>
            <input type="file" accept=".pdf" id="inputfield" />
        </div>
        </div>

        <div className={styles.jobDesc}>
        <textarea className={styles.textArea} placeholder="Paste Your Job Description here..." rows={10} cols={50} />
        
        <div className={styles.AnalyzeBtn}>Analyze</div>
        </div>
    </div>

    <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
            <div>Analyze with AI</div>

            <img  className={styles.profileImg} src={"https://www.shutterstock.com/image-photo/random-person-circle-profile-picture-260nw-2598615335.jpg"} alt="" />

            <h2>CodingHunger</h2>
        </div>


        {/* <div className={styles.DashboardRightTopCard}>
            <div>Result</div>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' , gap: 20}}>
        <h1>75% </h1>
            <CreditScoreRoundedIcon sx={{fontSize:22}}/>
        </div>

        <div className={styles.feedback}>
        <h3>Feedback</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, deserunt nemo repudiandae, iusto, consequatur ea error quibusdam quo vitae numquam vel voluptates impedit!</p>
        </div>
        </div> */}

        <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
        
    </div>
    </div>
);
};

export default WithAuthHOC(Dashboard)
