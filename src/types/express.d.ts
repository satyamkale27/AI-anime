import { Request } from "express";
import { File } from "multer";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    file?: MulterS3File;
  }
}

declare namespace Express {
  export interface MulterS3File extends File {
    key: string; // The S3 file key in the bucket
    // location: string; // The public URL of the uploaded file
    // bucket: string; // The S3 bucket name
  }
}
