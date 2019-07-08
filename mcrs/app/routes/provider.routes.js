const express = require("express");
const router = express.Router();
const providers = require("../controllers/provider.controller.js");

router.post("/", providers.create);

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add more animal
 *     description: Add animals to the list
 *     tags:
 *       - animals
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animals:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Adds the animals in body
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'Added'
 */
router.get("/", providers.findAll);

router.get("/:id", providers.findOne);

router.put("/:id", providers.update);

router.delete("/:id", providers.softDelete);

router.delete("/:id/hard", providers.hardDelete);

module.exports = router;
