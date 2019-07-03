const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 4000
const methodChunkRouter = require('./app/routes/methodChunk.routes.js')
const characteristicRouter = require('./app/routes/characteristic.routes.js')
const providerRouter = require('./app/routes/provider.routes.js')
const provider = require('./app/controllers/provider.controller.js')
const INDUSTRIES = require('./app/industries.js')

// create express app
const app = express()
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log("Successfully connected to the database")
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err)
  process.exit()
})

// define a simple route
app.get('/', (req, res) => {
  res.json({ "message": "Welcome to MCRS." })
})

app.get('/industries', (req, res) => {
  res.json(INDUSTRIES)
})

app.post('/login', (req, res) => {
  res.json({ "message": "Welcome to MCRS." })
})

app.post('/register', (req, res) => { provider.create(req, res) })

// Require routes
app.use('/method-chunks', methodChunkRouter)
app.use('/characteristics', characteristicRouter)
app.use('/providers', providerRouter)

// listen for requests
app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT)
})