import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

export const authenticateToken = (req: Request & {user?: any}, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(403).json({error: 'Invalid token'});
        }

        req.user = decoded;
        next();
    });
};
