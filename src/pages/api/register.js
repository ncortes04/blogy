const { PrismaClient } = require('@prisma/client');
const { signToken } = require('./middleware');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // User exists, perform login
      const validPassword = await bcrypt.compare(password, existingUser.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      const token = signToken({ id: existingUser.id, email: existingUser.email });
      res.status(200).json({ token });
    } else {
      // User doesn't exist, create a new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });

      const token = signToken(newUser);
      res.status(200).json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}
