import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  password: string;
}


declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    res.status(401).json({ message: 'Token ausente ou formato inválido' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    if (decoded && typeof decoded !== 'string') {
      const typedDecoded = decoded as CustomJwtPayload;
      req.user = typedDecoded;
      next();
    } else {
      res.status(403).json({ message: 'Token inválido' });
    }
  });
};

export default authenticateToken;