import { PrismaClient } from "@prisma/client";
import { formatTimestamp } from "../../common/utils";
import { getTemporaryImageUrl } from "./s3Utils";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const postId = parseInt(req.query.id);
    const postData = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            name: true,
            img: true,
            designation: true,
            bio: true,
            facebook: true,
            instagram: true,
            linkedin: true,
            twitter: true,
          },
        },
        comment: {
          include: {
            user: {
              select: {
                name: true,
                id: true,
                img: true,
                bio: true,
                facebook: true,
                instagram: true,
                linkedin: true,
                twitter: true,
              },
            },
          },
        },
      },
    });

    if (postData.comment.length > 0) {
      // Retrieve temporary image URLs for comment users
      const userPromises = postData.comment.map(async (comment) => {
        const temporaryImageUrl = await getTemporaryImageUrl(process.env.AWS_BUCKET_NAME, comment.user.img, 3600);
        comment.user.img = temporaryImageUrl;
        return comment;
      });
    
      const updatedComments = await Promise.all(userPromises);
    
      postData.comment = updatedComments;
    }
    
    // Retrieve temporary image URL for post user
    const temporaryImageUrl = await getTemporaryImageUrl(process.env.AWS_BUCKET_NAME, postData.user.img, 3600);

    postData.user.img = temporaryImageUrl;
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving post' });
  } finally {
    await prisma.$disconnect();
  }
}
