import { PrismaClient } from "@prisma/client";
import authMiddleware from "./middleware";

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
