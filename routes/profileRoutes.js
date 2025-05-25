const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken } = require('../middleware/authMiddleware');


/**
 * @swagger
 * /profile/profile:
 *   post:
 *     summary: Hent profil for innlogget bruker
 *     tags:
 *       - Profil
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Brukerprofil
 *       404:
 *         description: Bruker ikke funnet
 *       500:
 *         description: Feil ved henting av profil
 */

router.post('/profile', verifyToken, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, first_name, last_name, email, phone_number, role, created_at FROM users WHERE id = ?",
      [req.user.id]
    );
    const user = Array.isArray(result) ? result[0] : result;

    if (!user) return res.status(404).json({ error: "Bruker ikke funnet" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Feil ved henting av profil' });
  }
});

module.exports = router;
