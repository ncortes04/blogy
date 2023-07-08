import { PrismaClient } from "@prisma/client";
import { formatTimestamp } from "../../common/utils";
import { getTemporaryImageUrl } from "./s3Utils";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const postId = parseInt(req.query.id);
    
    // Increment the views for the post
    await prisma.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });

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
        comment.created_at = formatTimestamp(comment.created_at)
        comment.user.img = temporaryImageUrl;
        return comment;
      });
    
      const updatedComments = await Promise.all(userPromises);
    
      postData.comment = updatedComments;
    }
    
    // Retrieve temporary image URLs for featureImg and bannerImg
    if (postData.featureImg) {
      const featureImgUrl = await getTemporaryImageUrl(process.env.AWS_BUCKET_NAME, postData.featureImg, 3600);
      postData.featureImg = featureImgUrl;
    }
    
    if (postData.bannerImg) {
      const bannerImgUrl = await getTemporaryImageUrl(process.env.AWS_BUCKET_NAME, postData.bannerImg, 3600);
      postData.bannerImg = bannerImgUrl;
    }
    
    // Retrieve temporary image URL for post user
    postData.created_at =  formatTimestamp(postData.created_at)
    const temporaryImageUrl = await getTemporaryImageUrl(process.env.AWS_BUCKET_NAME, postData.user.img, 3600);
    postData.user.img = temporaryImageUrl;
    
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving post' });
  } finally {
    await prisma.$disconnect();
  }
}
