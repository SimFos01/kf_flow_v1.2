const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userlocksController = require('../controllers/userlocksController')

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Logg inn en bruker
 *     tags:
 *       - Autentisering
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returnerer en JWT-token ved suksess
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Ugyldig e-post eller passord
 */
router.post('/login', userController.loginUser);
/**
 * @swagger
 * /user/userlocks/shared-users:
 *   post:
 *     summary: Hent brukere en lås er delt med
 *     tags:
 *       - Brukerlås
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lock_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Liste over brukere
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   lock_count:
 *                     type: integer
 *       400:
 *         description: Mangler nødvendig data
 */

router.post('/userlocks/shared-users', userlocksController.getSharedUsers);

module.exports = router;
