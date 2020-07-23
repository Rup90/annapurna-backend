
import * as express from 'express';
import  { Response } from 'express';
import * as graphqlHTTP from 'express-graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import * as bodyParser from 'body-parser-graphql';
import * as cors from 'cors';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
const path = require('path');
require('dotenv').config();
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
import  logger  from './config/logs/logger';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

class App {
    public app: express.Application = express();
    public schema;
    constructor() {
        this.config();
    }

    private async config() {
        this.schema = await buildSchema({
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
        this.app.use('/images', express.static(path.join(__dirname, './images')));
        this.app.use((req, res, next) => {
            logger.log('http', req.body);
            next();
        });
        this.app.use(
            '/graphql',
            graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
            graphqlHTTP(
                async(req: AuthGuardRequest, res: Response) => {
                    return {
                        schema: this.schema,
                        context: {
                            isAuth: req.isAuth,
                            user_id: req.user_id,
                            role: req.role,
                            token: req.token
                        },
                        graphiql: true,
                        playground: true,
                        // subscriptionsEndpoint: `ws://localhost:5000/subscriptions`,
                        customFormatErrorFn: (error: any) => {
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

        // const server = createServer(this.app);
        // server.listen(5000, () => {
        //     console.log('Port <<>>>> running in 5000');
        //     new SubscriptionServer({
        //       execute,
        //       subscribe,
        //       schema: this.schema,
        //     }, {
        //       server: server,
        //       path: '/subscriptions',
        //     });
        // });
    }
}

Db.setupDb(new Db())
    .then(() => {
        const appInstance: App = new App();
        const app = appInstance.app;
        // app.listen(8000, () => {
        //     console.log('>>>> Port is running 8000')
        //     logger.log('info', 'Express server listening on port 8080');
        // });
        const server = createServer(appInstance.app);
        server.listen(8000, () => {
            console.log('Port <<>>>> running in 5000');
            new SubscriptionServer({
              execute,
              subscribe,
              schema: appInstance.schema,
            }, {
              server: server,
              path: '/subscriptions',
            });
        });
    })
    .catch((error) => {
        // console.log('database connection faild');
        logger.log('error', 'database connection faild');
    });