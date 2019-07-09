const express = require("express");
const router = express.Router();
const methodChunks = require("../controllers/methodChunk.controller.js");

/**
 * @swagger
 * /method-chunks:
 *   get:
 *     description: Returns a list of all method chunks
 *     tags:
 *       - Method Chunks
 *     responses:
 *       200:
 *         description: List of all method chunks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MethodChunk'
 *             example:
 *               - _id: "5d22f6449f200f0e74fbbfc0"
 *                 id: "agile-development-essentials"
 *                 name: "Agile Development Essentials"
 *                 provider: "Company A (Ltd.)"
 *                 url: "https://localhost:4000/method-chunks/agile-development-essentials"
 *                 characteristics: [
 *                   {
 *                      _id: "5d1cfc36bdc07232bc0bc1fa",
 *                      name: "Goal Number",
 *                      value: "multi-goals",
 *                      type: "nominal"
 *                   },
 *                   {
 *                      _id: "5d1cfc36bdc07232bc0bc1fa",
 *                      name: "User Involvement",
 *                      value: "high",
 *                      type: "ordinal"
 *                   }
 *                 ]
 *                 createdAt: "2019-07-07T09:51:41.221Z"
 *                 updatedAt: "2019-07-08T08:24:41.221Z"
 *               - _id: "5d224d482aba2723501a0cc8"
 *                 id: "kaos"
 *                 name: "KAOS"
 *                 provider: "Company A (Ltd.)"
 *                 url: "https://localhost:4000/method-chunks/kaos"
 *                 createdAt: "2019-07-08T08:24:41.221Z"
 *                 updatedAt: "2019-07-08T08:24:41.221Z"
 *
 */
router.get("/", methodChunks.findAll);

/**
 * @swagger
 * /method-chunks:
 *   post:
 *     description: Create a method chunk and add to the list. For bulk insert, see `bulk` in examples.
 *     tags:
 *       - Method Chunks
 *     requestBody:
 *       description: Method Chunk info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MethodChunkInput'
 *           examples:
 *             default:
 *               $ref: '#/components/examples/MethodChunkInputExample'
 *             bulk:
 *               value:
 *                 - name: "Kanban Board"
 *                   provider: "Company Tobacco"
 *                   url: "http://localhost:4000/method-chunks/kanban-board"
 *                 - name: "Sprint retrospective"
 *                   provider: "Company C"
 *                   url: "http://localhost:4000/method-chunks/sprint-retrospective"
 *                   characteristics: [
 *                     {
 *                       name: "delivery strategy",
 *                       value: "incremental",
 *                       type: "nominal"
 *                     }
 *                   ]
 *     responses:
 *       200:
 *         description: Add a method chunk
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MethodChunk'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/MethodChunkExample'
 *     security:
 *       - bearerAuth: []
 */
router.post("/", methodChunks.create);

/**
 * @swagger
 * /method-chunks/{id}:
 *   get:
 *     description: Get a method chunk
 *     tags:
 *       - Method Chunks
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the method chunk to get
 *         required: true
 *         schema:
 *           type: string
 *         example: "agile-development-essentials"
 *     responses:
 *       200:
 *         description: Get a method chunk
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MethodChunk'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/MethodChunkExample'
 */
router.get("/:id", methodChunks.findOne);

/**
 * @swagger
 * /method-chunks/{id}:
 *   put:
 *     description: Modify a method chunk
 *     tags:
 *       - Method Chunks
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the method chunk to modify
 *         required: true
 *         schema:
 *           type: string
 *         example: "agile-development-essentials"
 *     requestBody:
 *       description: Method Chunk info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MethodChunkUpdateInput'
 *           examples:
 *             default:
 *               value:
 *                  characteristics: [
 *                    {
 *                      name: "User Involvement",
 *                      value: "medium",
 *                      type: "ordinal"
 *                    },
 *                    {
 *                      name: "Management Commitment",
 *                      value: "low",
 *                      type: "ordinal"
 *                    }
 *                  ]
 *     responses:
 *       200:
 *         description: Updated a method-chunk
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MethodChunk'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/MethodChunkExample'
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", methodChunks.update);

/**
 * @swagger
 * /method-chunks/{id}:
 *   delete:
 *     description: Delete a method-chunk
 *     tags:
 *       - Method Chunks
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the method chunk to modify
 *         required: true
 *         schema:
 *           type: string
 *         example: "agile-development-essentials"
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleted successfully."
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", methodChunks.delete);

module.exports = router;
