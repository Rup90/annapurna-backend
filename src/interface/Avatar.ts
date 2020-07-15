import { Stream } from 'stream';

export interface UploadAvatar {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}