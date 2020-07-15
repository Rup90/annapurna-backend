import * as express from 'express';
import  { Response } from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as bodyParser from 'body-parser-graphql';
import * as cors from 'cors';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';

import UserResolver from './resolver/user.resolver';
import LoginResolver from './resolver/login.resolver';
import ItemResovler from './resolver/item.resolver';
import Db from './db';
import AuthGuard from './middleware/authenticationGuard';
import { authorizationChecker } from './middleware/authorizationChecker';
import AuthGuardRequest from './interface/AuthGuardRequest';
import RegistrationResolver from './resolver/registration.resolver';
import ItemsResovler from './resolver/addItems.resolver';
import RegisteredUsersResolver from './resolver/users.resolver';
import LogoutResolver from './resolver/logout';
import { UploadAvatareResolver } from './resolver/upload-avatar';

class App {
    public app: express.Application = express();

    constructor() {
        this.config();
    }

    private async config() {
        const schema = await buildSchema({
            resolvers: [
                LoginResolver,
                ItemResovler,
                RegistrationResolver,
                ItemsResovler,
                RegisteredUsersResolver,
                LogoutResolver,
                UploadAvatareResolver
            ],
            authChecker: authorizationChecker,
            validate: false
        });
        this.app.use(bodyParser.graphql());
        this.app.use(cors());
        this.app.use(AuthGuard);

        this.app.use(
            '/graphql',
            graphqlHTTP(
                async(req: AuthGuardRequest, res: Response) => {
                    return {
                        schema,
                        context: {
                            isAuth: req.isAuth,
                            user_id: req.user_id,
                            role: req.role,
                            token: req.token
                        },
                        graphiql: true,
                        playground: true,
                        customFormatErrorFn: (error) => {
                            return {
                                    message: error.message,
                                    path: error.path,
                                    locations: error.locations,
                                    errors:
                                    (error.originalError && error.originalError.details) ||
                                    error.message,
                                    statusCode:
                                    (error.originalError && error.originalError.statusCode) ||
                                    500
                                };
                        }
                    };
                }
            )
        );

    }
}

Db.setupDb(new Db())
    .then(() => {
        const app = new App().app;
        app.listen(8000, () => {
            console.log('Express server listening on port 8080');
        });
    })
    .catch((error) => {
        console.log('database connection faild');
    });