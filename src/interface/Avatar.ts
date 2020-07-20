import { Stream } from 'stream';

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}


// export interface Upload {
//   name: string;
//   type: string;
//   size: number;
//   path: any;
// }
