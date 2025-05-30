const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const logger = require('../utils/logger');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Minimal logging of login attempts without sensitive data
    logger.info('[LOGIN] Attempt for email:', email);
  
    try {
      const result = await db.query("SELECT * FROM users WHERE email = ?", [email.trim()]);
      const user = Array.isArray(result) ? result[0] : result;
  
      // Only log that a user record was retrieved
      logger.debug('🔎 Bruker fra SELECT');
  
      if (!user) {
        return res.status(401).json({ error: 'Ugyldig e-post eller passord' });
      }
      logger.debug('🔐 Sammenligner passord...');
        const valid = await bcrypt.compare(password, user.password);
        logger.debug('🔐 bcrypt valid:', valid);
      if (!valid) {
        return res.status(401).json({ error: 'Ugyldig e-post eller passord' });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );
  
      res.json({ token });
    } catch (err) {
      console.error('[LOGIN FEIL]', err);
      res.status(500).json({ error: 'Innloggingsfeil' });
    }
};

exports.getSharedUsers = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ error: 'Mangler token' });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Ugyldig token' });
  }
  const userId = decoded.id;

  // Hent alle brukere du som admin har delt låser med (direkte deling)
  try {
    const query = `
      SELECT u.email, ul.role, COUNT(ul.lock_id) AS lock_count
      FROM user_locks ul
      JOIN locks l ON ul.lock_id = l.id
      JOIN users u ON ul.user_id = u.id
      WHERE l.owner_id = ?
      GROUP BY u.email, ul.role
    `;
    let rows = await db.query(query, [userId]);
    rows = Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : rows;
    res.json(Array.isArray(rows) ? rows : []);
  } catch (err) {
    console.error('🔥 Feil i getSharedUsers:', err);
    res.status(500).json({ error: 'Kunne ikke hente delte brukere' });
  }
};
  
