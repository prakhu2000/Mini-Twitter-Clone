const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?req.header('Authorization'):'';
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized',message:false });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized',message:false });
  }
};

module.exports = authMiddleware;
