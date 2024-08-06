import jwt from 'jsonwebtoken';
import { Admin } from '../model/admin.model.js';

const verifyAdminToken = async (req, res, next) => {
    const token = req.cookies.adminAccessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(403).send({ msg: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const admin = await Admin.findById(decoded._id).select('-password');
        if (!admin) return res.status(403).send({ msg: 'Admin not found' });
        req.user = admin;
        next();
    } catch (err) {
        res.status(500).send({ msg: 'Failed to authenticate token' });
    }
};

export default verifyAdminToken;