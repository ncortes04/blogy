import { PrismaClient } from "@prisma/client";
import authMiddleware from "./middleware";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { user } = req;
  try {
    const { bio, img, designation } = req.body;

    // Check if the token matches the current user
    if (user.id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const foundUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!foundUser) {
      return res.status(400).json({ message: "Cannot find a user with this id!" });
    }

    // Update user attributes if provided
    if (bio && foundUser.bio !== bio) {
      await prisma.user.update({
        where: { id: user.id },
        data: { bio },
      });
    }

    if (img && foundUser.img !== img) {
      await prisma.user.update({
        where: { id: user.id },
        data: { img },
      });
    }

    if (designation && foundUser.designation !== designation) {
      await prisma.user.update({
        where: { id: user.id },
        data: { designation },
      });
    }

    // Retrieve the updated user
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(handler);
