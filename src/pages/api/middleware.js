const jwt = require('jsonwebtoken');
require('dotenv').config();

function signToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY);
}

const authMiddleware = (handler) => async (req, res) => {
  let token = req.headers.authorization;
  if (!token || token === 'null') {
    return res.status(400).json({ message: 'You have no token!' });
  }

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  try {
    const data = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = data;
    return await handler(req, res);
  } catch (error) {
    console.log('Invalid token:', error);
    return res.status(400).json({ message: 'Invalid token!' });
  }
};

export default authMiddleware;
export { signToken };
