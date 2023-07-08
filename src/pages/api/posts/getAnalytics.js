import { PrismaClient } from "@prisma/client";
import { getTemporaryImageUrl } from "../s3Utils";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const popularPosts = await prisma.post.findMany({
      include: {
        user: { select: { name: true, id: true } },
      },
      orderBy: {
        views: "desc",
      },
      take: 3,
    });

    const popularPostsWithImageUrls = await Promise.all(
      popularPosts.map(async (post) => {
        const imageUrls = {};

        if (post.featureImg) {
          const featureImgUrl = await getTemporaryImageUrl(process.env.AWS_BUCKET_NAME, post.featureImg);
          imageUrls.featureImg = featureImgUrl;
        }
        if (post.bannerImg) {
          const bannerImgUrl = await getTemporaryImageUrl(process.env.AWS_BUCKET_NAME, post.bannerImg);
          imageUrls.bannerImg = bannerImgUrl;
        }
        if (post.iconImg) {
          const iconImgUrl = await getTemporaryImageUrl(process.env.AWS_BUCKET_NAME, post.iconImg);
          imageUrls.iconImg = iconImgUrl;
        }

        return { ...post, ...imageUrls };
      })
    );

    res.status(200).json(popularPostsWithImageUrls);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving popular posts data" });
  }
}
