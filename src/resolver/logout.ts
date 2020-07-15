import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import { LogoutInput, LogoutConfirmation } from '../schema/logout.schema';
import JwdTokenPayload from '../interface/JwdTokenPayload';

@Resolver()
export default class LogoutResolver {

    @Query(returns => LogoutConfirmation, { nullable: true })
    async logout(
        @Ctx() ctx: JwdTokenPayload,
        @Arg('logoutInput') logoutInput: LogoutInput): Promise<LogoutConfirmation> {
            console.log('ctx ===>', ctx);
        ctx.token = '';
        return {
            message: 'Successfully logout.'
        };
    }
}
