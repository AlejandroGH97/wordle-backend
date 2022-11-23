const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: 86400 });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    req.userId = decoded.id;

    next();
  });
}

module.exports = { generateAccessToken, authenticateToken };
