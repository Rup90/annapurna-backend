import  { Request } from 'express';
import JwdTokenPayload from './JwdTokenPayload';

export default interface AuthGuardRequest extends Request, JwdTokenPayload {
    isAuth: boolean;
}