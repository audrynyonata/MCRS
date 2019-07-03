const express = require('express')
const router = express.Router()
const projects = require('../controllers/project.controller.js')

router.post('/', projects.create)

router.get('/', projects.findAll)

router.get('/:provider_id/:project_id', projects.findOne)

router.put('/:provider_id/:project_id', projects.update)

router.delete('/:provider_id/:project_id', projects.softDelete)

router.delete('/:provider_id/:project_id/hard', projects.hardDelete)

module.exports = router