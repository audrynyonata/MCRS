const express = require('express');
const router = express.Router();
const projectCharacteristic = require('../controllers/projectCharacteristic.controller.js');

router.post('/', projectCharacteristic.create);

router.get('/', projectCharacteristic.findAll);

// router.get('/:id', projectCharacteristic.findOne);

// router.put('/:id', projectCharacteristic.update);

// router.delete('/:id', projectCharacteristic.delete);

module.exports = router;