import { Library } from "../model/library.model.js";

const logoutUser = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await Library.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email' });
        }

        user.refreshToken = null; // Invalidate the refresh token
        await user.save();

        res.json({ msg: 'Logged out successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export {logoutUser};