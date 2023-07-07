import { PrismaClient } from "@prisma/client";
import { formatTimestamp } from "../../../common/utils";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { name: true, id: true } },
      },
    });
    posts.map((post) => post.created_at = formatTimestamp(post.created_at))
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts" });
  }
}
