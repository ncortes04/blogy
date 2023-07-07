import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware";

const prisma = new PrismaClient();

const addComment = async (req, res) => {
  const { user = null, body } = req;
  const postId = Number(body.id); // Convert id to a number

  try {
    const commentData = await prisma.comment.create({
      data: {
        description: body.description,
        user_id: user.id,
        post_id: postId,
      },
    });

    res.json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export default authMiddleware(addComment);
