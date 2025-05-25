const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');
const accessGroupController = require('../controllers/accessGroupController');
console.log('TYPE OF requireAdmin:', typeof requireAdmin);
console.log('controller:', accessGroupController);
console.log('createGroup:', accessGroupController.createGroup);
console.log('verifyToken:', typeof verifyToken);
console.log('requireAdmin:', typeof requireAdmin);
/**
 * @swagger
 * /accessGroup/list:
 *   post:
 *     summary: Hent tilgangsgrupper for bruker
 *     tags:
 *       - Tilgangsgrupper
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Liste over tilgangsgrupper
 *       401:
 *         description: Ugyldig eller manglende token
 *       500:
 *         description: Serverfeil
 */
router.post('/list', verifyToken, accessGroupController.getAccessGroupsForUser);
/**
 * @swagger
 * /accessgroup/access-group/users:
 *   post:
 *     summary: Hent brukere i en tilgangsgruppe
 *     tags:
 *       - Tilgangsgrupper
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, group_id]
 *             properties:
 *               token:
 *                 type: string
 *               group_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Liste over brukere i gruppen
 *       401:
 *         description: Ugyldig eller manglende token
 *       403:
 *         description: Mangler tilgang
 *       500:
 *         description: Serverfeil
 */
router.post('/accessgroup/users', accessGroupController.getUsersInAccessGroup);

module.exports = router;
