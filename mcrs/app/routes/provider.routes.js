const express = require('express')
const router = express.Router()
const providers = require('../controllers/provider.controller.js')

router.post('/', providers.create)

router.get('/', providers.findAll)

router.get('/:id', providers.findOne)

router.put('/:id', providers.update)

router.delete('/:id', providers.softDelete)

router.delete('/:id/hard', providers.hardDelete)

module.exports = router