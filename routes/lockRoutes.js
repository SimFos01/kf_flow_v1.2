// File: /routes/lockRoutes.js

const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/authMiddleware');
const lockController = require('../controllers/lockController');

/**
 * @swagger
 * /lock:
 *   post:
 *     summary: Opprett en ny lås
 *     tags:
 *       - Lås
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type, adapter_data]
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               adapter_data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Låsen ble opprettet
 *       400:
 *         description: Ugyldig input
 *       500:
 *         description: Serverfeil
 */
router.post('/', verifyToken, lockController.createLock);

/**
 * @swagger
 * /lock:
 *   get:
 *     summary: Hent låser som brukeren har tilgang til
 *     tags:
 *       - Lås
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste over låser
 *       500:
 *         description: Feil ved henting av låser
 */

router.get('/', verifyToken, lockController.getAccessibleLocks);

/**
 * @swagger
 * /lock/{id}/status:
 *   get:
 *     summary: Hent status på lås
 *     tags:
 *       - Lås
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lås-ID
 *     responses:
 *       200:
 *         description: Statusinformasjon
 *       403:
 *         description: Ingen tilgang
 *       500:
 *         description: Serverfeil
 */
router.get('/:id/status', verifyToken, lockController.lockStatus);

/**
 * @swagger
 * /lock/{id}/open:
 *   post:
 *     summary: Fjernlås en lås
 *     tags:
 *       - Lås
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Låsen åpnet
 *       403:
 *         description: Ingen tilgang
 *       500:
 *         description: Feil under åpning
 */

router.post('/:id/open', verifyToken, lockController.openLock);

/**
 * @swagger
 * /lock/{id}/lock:
 *   post:
 *     summary: Fjernlås en lås
 *     tags:
 *       - Lås
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Låsen låst
 *       403:
 *         description: Ingen tilgang
 *       500:
 *         description: Feil under låsing
 */

router.post('/:id/lock', verifyToken, lockController.lockLock);
/**
 * @swagger
 * /lock/accessible:
 *   post:
 *     summary: Hent låser eid av innlogget bruker
 *     tags:
 *       - Lås
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
 *         description: Låser til bruker
 */
router.post('/accessible', verifyToken, lockController.getLockList);
/**
 * @swagger
 * /lock/getbyid:
 *   post:
 *     summary: Hent en spesifikk lås ved ID
 *     tags:
 *       - Lås
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, token]
 *             properties:
 *               id:
 *                 type: integer
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Låsdetaljer
 *       404:
 *         description: Ikke funnet
 *       500:
 *         description: Serverfeil
 */
router.post('/getbyid', verifyToken, lockController.getLockById);
/**
 * @swagger
 * /lock/all_accessible:
 *   post:
 *     summary: Hent alle låser brukeren har tilgang til
 *     tags:
 *       - Lås
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
 *         description: Liste over låser
 */
router.post('/all_accessible', lockController.getAllAccessibleLocks);


module.exports = router;
