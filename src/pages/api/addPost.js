import { PrismaClient } from "@prisma/client";
import authMiddleware from "./middleware";

const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { user } = req;
  const { body } = req;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body,
        user: { connect: { id: user.id } },
      },
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(createPost);
