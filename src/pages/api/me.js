import { PrismaClient } from "@prisma/client";
import {getTemporaryImageUrl} from "./s3Utils";
import authMiddleware from "./middleware";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./aws-config";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { user } = req;

  try {
    const foundUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        post: true,
      },
    });

    // Retrieve temporary image URL
    const temporaryImageUrl = await getTemporaryImageUrl(process.env.AWS_BUCKET_NAME, foundUser.img, 3600);

    foundUser.img = temporaryImageUrl;

    if (!foundUser) {
      return res.status(400).json({ message: "Cannot find a user with this id!" });
    }

    res.json({ foundUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(handler);
