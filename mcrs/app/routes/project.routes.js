const express = require("express");
const router = express.Router();
const projects = require("../controllers/project.controller.js");

/**
 * @swagger
 * /projects:
 *   get:
 *     description: Returns a list of all projects
 *     tags:
 *       - Projects
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
 *         name: provider
 *         schema:
 *           type: string
 *       - in: query
 *         name: project
 *         schema:
 *           type: string
 *       - in: query
 *         name: characteristics_name
 *         schema:
 *           type: string
 *       - in: query
 *         name: characteristics_optimal_sense
 *         schema:
 *           type: string
 *       - in: query
 *         name: characteristics_type
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         description: sort by key e.g. name, provider
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         description: sort order e.g. asc, desc
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: array of projects
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *             example:
 *               - _id: "5d22f6449f200f0e74fbbfc0"
 *                 id: "company-a-ltd/my-project"
 *                 name: "My Project"
 *                 project: "my-project"
 *                 provider: "Company A (Ltd.)"
 *                 url: "https://localhost:4000/projects/company-a-ltd/my-project"
 *                 characteristics: [
 *                   {
 *                      _id: "5d1cfc36bdc07232bc0bc1fa",
 *                      name: "Goal Number",
 *                      optimal_sense: "multi-goals",
 *                      type: "nominal"
 *                   },
 *                   {
 *                      _id: "5d1cfc36bdc07232bc0bc1fa",
 *                      name: "User Involvement",
 *                      optimal_sense: "minimum",
 *                      type: "ordinal"
 *                   }
 *                 ]
 *                 createdAt: "2019-07-07T09:51:41.221Z"
 *                 updatedAt: "2019-07-08T08:24:41.221Z"
 */
router.get("/", projects.findAll);

/**
 * @swagger
 * /projects:
 *   post:
 *     description: Create a project and add to the list. For bulk insert, see `bulk` in examples.
 *     tags:
 *       - Projects
 *     requestBody:
 *       description: Project info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *           examples:
 *             default:
 *               $ref: '#/components/examples/ProjectInputExample'
 *             bulk:
 *               value:
 *                 - provider: "Company Tobacco"
 *                   name: "First Project"
 *                   characteristics: [
 *                     {
 *                       name: "Stakeholder number",
 *                       optimal_sense: "maximum",
 *                       type: "numerical"
 *                     }
 *                   ]
 *     responses:
 *       200:
 *         description: Add a project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/ProjectExample'
 *     security:
 *       - bearerAuth: []
 */
router.post("/", projects.create);

/**
 * @swagger
 * /projects/{provider_id}/{project_id}:
 *   get:
 *     description: Get a project
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: provider_id
 *         description: id of the project's provider to get
 *         required: true
 *         schema:
 *           type: string
 *         example: "company-a-ltd"
 *       - in: path
 *         name: project_id
 *         description: id of the project to get
 *         required: true
 *         schema:
 *           type: string
 *         example: "my-project-2"
 *     responses:
 *       200:
 *         description: Get a project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/ProjectExample'
 */
router.get("/:provider_id/:project_id", projects.findOne);

/**
 * @swagger
 * /projects/{provider_id}/{project_id}:
 *   put:
 *     description: Modify a project
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: provider_id
 *         description: id of the project's provider to get
 *         required: true
 *         schema:
 *           type: string
 *         example: "company-a-ltd"
 *       - in: path
 *         name: project_id
 *         description: id of the project to get
 *         required: true
 *         schema:
 *           type: string
 *         example: "my-project-2"
 *     requestBody:
 *       description: Project info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectUpdateInput'
 *           examples:
 *             default:
 *               value:
 *                  characteristics: [
 *                    {
 *                      name: "User Involvement",
 *                      optimal_sense: "maximum",
 *                      type: "ordinal"
 *                    }
 *                  ]
 *     responses:
 *       200:
 *         description: Updated a project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *             examples:
 *               default:
 *                 $ref: '#/components/examples/ProjectExample'
 *     security:
 *       - bearerAuth: []
 */
router.put("/:provider_id/:project_id", projects.update);

/**
 * @swagger
 * /projects/{provider_id}/{project_id}:
 *   delete:
 *     description: Delete a project
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: provider_id
 *         description: id of the project's provider to get
 *         required: true
 *         schema:
 *           type: string
 *         example: "company-a-ltd"
 *       - in: path
 *         name: project_id
 *         description: id of the project to get
 *         required: true
 *         schema:
 *           type: string
 *         example: "my-project-2"
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
router.delete("/:provider_id/:project_id", projects.delete);

module.exports = router;
