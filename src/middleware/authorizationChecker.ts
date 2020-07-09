import { AuthChecker } from  'type-graphql';
import JwdTokenPayload from '../interface/JwdTokenPayload';

export const authorizationChecker: AuthChecker<JwdTokenPayload> = ({ context: { user_id, role } }, roles) => {

    if (roles.length === 0) {
      return user_id !== undefined;
    }

    if (!user_id) {
      return false;
    }

    if (roles.includes(role)) {
      return true;
    }

    return false;
};