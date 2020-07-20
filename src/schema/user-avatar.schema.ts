import { InputType, Field, ObjectType } from 'type-graphql';
import { Stream } from 'stream';


@InputType()
export class Upload {
  @Field(type => Stream)
  createReadStream: () => Stream;

  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  filesize: string;
}

// export class Upload {
//   @Field()
//   size: string;

//   @Field()
//   name: string;

//   @Field()
//   type: string;

//   @Field()
//   path: string;
// }
