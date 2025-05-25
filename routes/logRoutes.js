// File: /routes/logRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware'); // ✅ riktig
const logController = require('../controllers/logController');
const { getLastActivityForLock } = require('../controllers/logController');


router.use(verifyToken);

// Hent alle logger

/**
 * @swagger
 * /log:
 *   get:
 *     summary: Hent alle adgangslogger
 *     tags:
 *       - Logger
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste over logger
 *       500:
 *         description: Kunne ikke hente logger
 */
router.get('/', logController.getAllLogs);

/**
 * @swagger
 * /log/{lockId}:
 *   get:
 *     summary: Hent logger for spesifikk lås
 *     tags:
 *       - Logger
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lockId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID for låsen
 *     responses:
 *       200:
 *         description: Logger for valgt lås
 *       500:
 *         description: Kunne ikke hente logger
 */

router.get('/:lockId', verifyToken, logController.getLogsByLock);

router.get('/:lockId/last', verifyToken, getLastActivityForLock);

module.exports = router;
