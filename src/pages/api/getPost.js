import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handler(req, res) {
    try {
      const postId = parseInt(req.query.id);
      const postData = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          comment: {
            include: {
              user: {
                select: { name: true, id: true },
              },
            },
          },
          user: {
            select: { name: true },
          },
        },
      });
      res.status(200).json(postData);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving post' });
    }
  }
  