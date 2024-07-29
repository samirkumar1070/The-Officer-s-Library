import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    // Log tokens for debugging
    // console.log("Token from cookie:", req.cookies.accessToken);
    // console.log("Token from header:", req.header("Authorization"));

    if (!token) {
        return res.status(403).send({ msg: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the admin associated with the token
        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(403).send({ msg: 'User not found' });
        }

        // Set admin in request object
        req.user = user;
        next();
    } catch (err) {
        console.error('Failed to authenticate token:', err.message); // Log errors
        res.status(500).send({ msg: 'Failed to authenticate token' });
    }
};

export default verifyToken;
