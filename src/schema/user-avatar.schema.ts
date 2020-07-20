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

@ObjectType()
export class ImagePathReturn {
  @Field()
  status: number;

  @Field()
  avatar: string;
}
