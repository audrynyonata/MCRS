const express = require("express");
const router = express.Router();
const characteristics = require("../controllers/characteristic.controller.js");

/**
 * @swagger
 * /characteristics:
 *   get:
 *     description: Returns a list of all characteristics
 *     tags:
 *       - Characteristics
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *       - in: query
 *         name: dimension
 *         schema:
 *           type: string
 *       - in: query
 *         name: characteristics_value
 *         schema:
 *           type: string
 *       - in: query
 *         name: characteristics_type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all characteristics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: array of characteristics
 *               items:
 *                 $ref: '#/components/schemas/Characteristic'
 *             example:
 *               - _id: "5d22f6449f200f0e74fbbfc0"
 *                 id: "impact"
 *                 name: "Impact"
 *                 dimension: "organisational"
 *                 characteristic_values: [
 *                   {
 *                      _id: "5d1d39e2f1cb6b35106f36d8",
 *                      values: ["low", "medium", "high"],
 *                      type: "ordinal"
 *                   },
 *                   {
 *                      _id: "5d1cfc36bdc07232bc0bc1fa",
 *                      values: ["application with GUI","application with API"],
 *                      type: "nominal"
 *                   }
 *                 ]
 *                 createdAt: "2019-07-07T09:51:41.221Z"
 *                 updatedAt: "2019-07-08T08:24:41.221Z"
 *
 */
router.get("/", characteristics.findAll);

/**
 * @swagger
 * /characteristics:
 *   post:
 *     description: Create a characteristic and add to the list. For bulk insert, see `bulk` in examples.
 *     tags:
 *       - Characteristics
 *     requestBody:
 *       description: characteristic info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CharacteristicInput'
 *           examples:
 *             default:
 *               $ref: '#/components/examples/CharacteristicInputExample'
 *             bulk:
 *               value:
 *                  - name: "Management commitment"
 *                    values: ["low", "medium", "high"]
 *                    type: "ordinal"
 *                    description: "The rate of commitment of management."
 *                  - name: "Stakeholder number"
 *                    values: ["1", "10", "50"]
 *                    type: "numerical"
 *                    description: "The number of stakeholder"
 *     responses:
 *       200:
 *         description: Add a characteristic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Characteristic'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/CharacteristicExample'
 *     security:
 *       - bearerAuth: []
 */
router.post("/", characteristics.create);

/**
 * @swagger
 * /characteristics/{id}:
 *   get:
 *     description: Get a characteristic
 *     tags:
 *       - Characteristics
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the characteristic to get
 *         required: true
 *         schema:
 *           type: string
 *         example: "impact"
 *     responses:
 *       200:
 *         description: Get a characteristic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Characteristic'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/CharacteristicExample'
 */
router.get("/:id", characteristics.findOne);

/**
 * @swagger
 * /characteristics/{id}:
 *   put:
 *     description: Modify a characteristic
 *     tags:
 *       - Characteristics
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the characteristic to modify
 *         required: true
 *         schema:
 *           type: string
 *         example: "impact"
 *     requestBody:
 *       description: characteristic info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CharacteristicUpdateInput'
 *           examples:
 *             default:
 *               value:
 *                  dimension: "application domain"
 *     responses:
 *       200:
 *         description: Updated a characteristic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Characteristic'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/CharacteristicExample'
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", characteristics.update);

/**
 * @swagger
 * /characteristics/{id}:
 *   delete:
 *     description: Delete a characteristic
 *     tags:
 *       - Characteristics
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the characteristic to modify
 *         required: true
 *         schema:
 *           type: string
 *         example: "impact"
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
router.delete("/:id", characteristics.delete);

module.exports = router;
