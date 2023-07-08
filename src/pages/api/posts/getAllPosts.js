import { PrismaClient } from "@prisma/client";
import { formatTimestamp } from "../../../common/utils";
import { getTemporaryImageUrl } from "../s3Utils";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { name: true, id: true } },
      },
    });

    const postsWithImageUrls = await Promise.all(
      posts.map(async (post) => {
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

    postsWithImageUrls.map((post) => (post.created_at = formatTimestamp(post.created_at)));

    res.status(200).json(postsWithImageUrls);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts" });
  }
}
