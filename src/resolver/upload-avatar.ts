import {
    Resolver,
    Arg,
    Mutation,
    Authorized
} from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { UploadAvatar } from '../interface/Avatar';

@Resolver()
export class UploadAvatareResolver {
  @Mutation(() => Boolean)
  async uploadProfileAvatar(@Arg('avatar', () => GraphQLUpload)
  {
    createReadStream,
    filename
  }: UploadAvatar): Promise<boolean> {
    return new Promise(async(resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../images/avatar/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }
}
