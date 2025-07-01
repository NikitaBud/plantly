import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      name: payload.name
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
}

export default authMiddleware;