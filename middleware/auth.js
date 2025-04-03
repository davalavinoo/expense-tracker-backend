const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debug
    req.user = decoded; // Use decoded directly since token has "id"
    next();
  } catch (err) {
    console.error('Token Verification Error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
