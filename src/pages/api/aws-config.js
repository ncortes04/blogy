import { S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'

dotenv.config()

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_BUCKET_REGION,
})

export default s3Client;
