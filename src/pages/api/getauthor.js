import { PrismaClient } from "@prisma/client";
import { getTemporaryImageUrl } from "./s3Utils";
import authMiddleware from "./middleware";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./aws-config";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const currentUserId = user.id;

  try {
    const foundUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        bio: true,
        designation: true,
        img: true,
        facebook: true,
        instagram: true,
        twitter: true,
        linkedin: true,
        post: {
          select: {
            id: true,
            name: true,
            description: true,
            brief: true,
            category: true,
            read_time: true,
            featureImg: true,
          },
        },
      },
    });

    const temporaryProfileImageUrl = await getTemporaryImageUrl(
      process.env.AWS_BUCKET_NAME,
      foundUser.img,
      3600
    );
    foundUser.img = temporaryProfileImageUrl;

    const postsWithTemporaryUrls = await Promise.all(
      foundUser.post.map(async (post) => {
        if (!post.featureImg) {
          return post;
        }
        const temporaryImageUrl = await getTemporaryImageUrl(
          process.env.AWS_BUCKET_NAME,
          post.featureImg,
          3600
        );
        return { ...post, featureImg: temporaryImageUrl };
      })
    );

    foundUser.post = postsWithTemporaryUrls;

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Cannot find a user with this id!" });
    }

    // Check if the current user ID matches the author's ID


    res.json({ foundUser, currentUserId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(handler);
