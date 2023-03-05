import * as jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' });
    }

    try {
        console.log('process.env.ACCESS_TOKEN_SECRET', process.env.ACCESS_TOKEN_SECRET);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ success: false, message: 'Invalid token' });
    }
};
