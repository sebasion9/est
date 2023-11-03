import jwt from 'jsonwebtoken';
import conf from '../db/dbconf.json';
import { User } from '../db/user';
import { Request, Response, NextFunction } from 'express';
const tokenSecret = conf.jwtSecret;
export interface rRequest extends Request
{
    user? : User;
}

export function generateToken(user:User) : string
{
    return jwt.sign({username: user.username, role: user.role},tokenSecret,{expiresIn: 1800}); 
}
export const authenticateJWT = (req : rRequest, res : Response, next : NextFunction) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, tokenSecret, (err : any, user : any) => {
            if (err) {
                return res.status(403).json({message: 'forbidden'});
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({message: 'unauthorized'});
    }
};