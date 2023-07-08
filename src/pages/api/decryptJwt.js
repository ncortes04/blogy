const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

const getUserData = async (req, res) => {
  let token = req.headers.authorization;
  if (!token || token === 'null') {
    return res.status(400).json({ message: 'You have no token!' });
  }

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    console.log(data)

    return res.status(200).json(data);
  } catch (error) {
    console.log('Invalid token:', error);
    return res.status(400).json({ message: 'Invalid token!' });
  }
};

module.exports = getUserData;
