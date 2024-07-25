import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    //console.log("Token from cookie:", req.cookies.accessToken);  // Debug log
    //console.log("Token from header:", req.header("Authorization"));  // Debug log
    if (!token) {
        return res.status(403).send({ msg: 'No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ msg: 'Failed to authenticate token' });
        }
        req.userId = decoded._id;
        next();
    });
};

export default verifyToken;
