import {Library} from "../model/library.model.js";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Library.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (!user.isActive) {
            return res.status(403).json({ msg: 'Your account is blocked. Please contact admin.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export {loginUser};