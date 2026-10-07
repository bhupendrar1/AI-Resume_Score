const UserModel = require('../Models/user');

exports.register = async (req, res) => {
    try {
        const { name, email, photoUrl } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        let user = await UserModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
            user = new UserModel({
                name: name || 'User',
                email: email.toLowerCase(),
                photoUrl: photoUrl || '',
                role
            });
            await user.save();
            return res.status(201).json({
                message: 'User registered successfully',
                user
            });
        }

        // Update photo, name or role if changed
        if (name && user.name !== name) user.name = name;
        if (photoUrl && user.photoUrl !== photoUrl) user.photoUrl = photoUrl;
        if (user.email.includes('admin') && user.role !== 'admin') user.role = 'admin';
        await user.save();

        return res.status(200).json({
            message: 'Welcome back',
            user
        });
    } catch (err) {
        console.error('Error in register controller:', err);
        return res.status(500).json({ error: 'Server error', message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().sort({ createdAt: -1 });
        return res.status(200).json({ users });
    } catch (err) {
        return res.status(500).json({ error: 'Server error', message: err.message });
    }
};
