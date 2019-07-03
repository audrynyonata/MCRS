const express = require('express')
const router = express.Router()
const methodChunks = require('../controllers/methodChunk.controller.js')

router.post('/', methodChunks.create)

router.get('/', methodChunks.findAll)

router.get('/:id', methodChunks.findOne)

router.put('/:id', methodChunks.update)

router.delete('/:id', methodChunks.softDelete)

router.delete('/:id/hard', methodChunks.hardDelete)

module.exports = router