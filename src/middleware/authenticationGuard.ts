import  { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import constaint from '../constaint/constaint';
import JwdTokenPayload from '../interface/JwdTokenPayload';
import AuthGuardRequest from '../interface/AuthGuardRequest';

export default (req: AuthGuardRequest, res: Response, next: NextFunction) => {
    const authHeader = <string>req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token: string[] = authHeader.split(' ');
    let jwtPayload: JwdTokenPayload;
    try {
        jwtPayload = <JwdTokenPayload>verify(token[1], constaint.JWT_PRIVATE_KEY);
    } catch {
        req.isAuth = false;
        return next();
    }

    if(!jwtPayload) {
        req.isAuth = false;
        return next();
    }

    req.user_id = jwtPayload.user_id;
    req.role = jwtPayload.role;
    req.isAuth = true;
    next();
};