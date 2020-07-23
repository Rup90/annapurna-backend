import { buildSchema } from 'type-graphql';
import RegistrationResolver  from '../resolver/registration.resolver';


export const createSchema = () =>
  buildSchema({
    resolvers: [
        RegistrationResolver
    ]
  });