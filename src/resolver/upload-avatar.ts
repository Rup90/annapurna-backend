import {
    Resolver,
    Arg,
    Mutation,
    Authorized
} from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Upload } from '../interface/Avatar';
const fs = require('fs');
@Resolver()
export class UploadAvatareResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(@Arg('picture', () => GraphQLUpload) {
    createReadStream,
    filename
  }: Upload): Promise<boolean> {
    console.group(filename);
    return new Promise(async(resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../images/avatar/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }
}
