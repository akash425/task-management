exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      const hasAllowedRole = allowedRoles.includes(req.user.role);
      if (!hasAllowedRole) {
        return res.status(403).json({ error: 'Not authorized' });
      }
      
      next();
    };
  };