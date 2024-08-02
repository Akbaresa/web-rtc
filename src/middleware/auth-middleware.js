import db from '../app/database.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    res.status(401).json({
      errors: 'Unauthorized'
    }).end();
  } else {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE token = ?', [token]);
      if (rows.length === 0) {
        res.status(401).json({
          errors: 'Unauthorized'
        }).end();
      } else {
        req.user = rows[0];
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        errors: 'Internal Server Error'
      }).end();
    }
  }
};
