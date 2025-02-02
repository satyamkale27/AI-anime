import express, { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

interface S3ClientConfig {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

interface FileMetadata {
  fieldName: string;
}

const s3ClientConfig: S3ClientConfig = {
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

const s3Client = new S3Client(s3ClientConfig);

const storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_BUCKET_NAME!,
  acl: "public-read",
  metadata: function (
    req: express.Request,
    file: Express.Multer.File,
    cb: (error: any, metadata?: FileMetadata) => void
  ) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (
    req: express.Request,
    file: Express.Multer.File,
    cb: (error: any, key?: string) => void
  ) {
    // Generates a unique key (path) for each file uploaded
    cb(null, `user-images/${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export { s3Client, storage, upload };
