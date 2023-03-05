import jwt from 'jsonwebtoken';

function authMiddleware(handler) {
    return async (req, res) => {
        console.log('jiiiiii')
      const { authorization } = req.headers;
  
      if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const token = authorization.replace('Bearer ', '');
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return handler(req, res);
      } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    };
  }
  