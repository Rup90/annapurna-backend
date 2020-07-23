
import { gCall } from '../test-utils/gCall';
import * as mongoose from 'mongoose';
// let conn: Connection;
beforeAll(async() => {
  // conn = await testConn();
  await mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
   });
});
afterAll(async() => {
  // await conn.close();
});

const registerMutation = `
    mutation registration($data: RegistrationInput!) {
        registration(
        data: $data
    ) {
        status,
        message
        email
        mailInfo
    }
    }
`;

describe('Registration', () => {
  it('create user', async() => {
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: 'Rupayan',
            lastName: 'Dey',
            email: 'rupayan.dey1990@gmail.com',
            password: 'password',
            role: 'FARMAR'
          }
        }
      });
  });
});