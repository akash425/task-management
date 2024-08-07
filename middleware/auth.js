const jwt = require('jsonwebtoken');
// const Blacklist = require('../models/Blacklist');
const client = require('../utils/redisClient');


exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    await client.connect();
    console.log("token >>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(token);
    client.get(token, (err, reply) => {
      console.log("reply >>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(reply);
      console.log(err);
      if (err) throw err;
      if (reply) res.status(401).json({ error: 'Token is invalidated' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
}; 