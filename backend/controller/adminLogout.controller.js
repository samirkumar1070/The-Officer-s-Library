import { Admin } from "../model/admin.model.js";

const logoutAdmin = async (req, res) => {
    const { email } = req.body;
    try {
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid email' });
        }

        admin.refreshToken = null; // Invalidate the refresh token
        await admin.save();

        res.json({ msg: 'Logged out successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export {logoutAdmin};