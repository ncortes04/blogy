const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { id } = req.body;

    const profileData = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        post: true,
      },
    });

    if (!profileData) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
}
