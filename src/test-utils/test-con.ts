import { createConnection } from 'typeorm';
import * as mongoose from 'mongoose';

export const testConn = (drop: boolean = false) => {
//   return createConnection({
//     name: 'default',
//     type: 'mongodb',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'postgres',
//     database: 'typegraphql-example-test',
//     synchronize: drop,
//     dropSchema: drop,
//     // entities: [__dirname + '/../entity/*.*']
//     entities: [__dirname + '/../schema/*.*']
//   });
};