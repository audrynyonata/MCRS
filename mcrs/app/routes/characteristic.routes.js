const express = require('express')
const router = express.Router()
const characteristics = require('../controllers/characteristic.controller.js')

router.post('/', characteristics.create)

router.get('/', characteristics.findAll)

router.get('/:id', characteristics.findOne)

router.put('/:id', characteristics.update)

router.delete('/:id', characteristics.softDelete)

router.delete('/:id/hard', characteristics.hardDelete)

module.exports = router