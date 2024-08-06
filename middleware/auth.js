const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');

exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const blacklistedToken = await Blacklist.findOne({ token });
    console.log(blacklistedToken);
    if (blacklistedToken) {
        return res.status(401).json({ error: 'Token is invalidated' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
}; 