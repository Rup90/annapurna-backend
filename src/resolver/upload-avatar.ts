import {
    Resolver,
    Arg,
    Mutation,
    Authorized,
    Ctx
} from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Upload } from '../interface/Avatar';
import JwdTokenPayload from '../interface/JwdTokenPayload';
import RegisteredUsers from '../models/registration.model';
import { ImagePathReturn } from '../schema/user-avatar.schema';
@Resolver()
export class UploadAvatareResolver {

  @Authorized()
  @Mutation(() => ImagePathReturn)
  async addProfilePicture(
      @Ctx() ctx: JwdTokenPayload,
      @Arg('picture', () => GraphQLUpload) {
      createReadStream,
      filename
  }: Upload): Promise<ImagePathReturn> {
      const path = __dirname + `/../images/avatar/${filename}`;
      const userImagePath = `images/avatar/${filename}`;
      const response = {
        status: 200,
        avatar: ''
      };
      const file = createReadStream().pipe(createWriteStream(path));
      const uid = { _id: ctx.user_id };
      await RegisteredUsers.findOneAndUpdate(uid, {avatar: userImagePath}, {
            new: true
      }, (err, res)  => {
        if (err) {
          response.status = 401;
        } else {
          response.avatar = userImagePath;
        }
      });
      return await response;
  }
}
