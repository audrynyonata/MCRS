const express = require('express');
const router = express.Router();
const projects = require('../controllers/project.controller.js');

router.post('/', projects.create);

router.get('/', projects.findAll);

// router.get('/:id', projects.findOne);

// router.delete('/:id', projects.delete);

module.exports = router;