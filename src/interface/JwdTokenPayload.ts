export default interface JwdTokenPayload {
    user_id: string;
    role: string;
    iat: number;
    exp: number;
    token: string;
}