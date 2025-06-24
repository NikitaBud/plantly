import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  let token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      username: payload.email
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
}

export default auth;