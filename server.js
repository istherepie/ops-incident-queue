'use strict'

// Modules
const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const incidents = require('routes/incidents')

// Constants
const app = express()
const server = http.createServer(app)
const port = process.env.SERVER_PORT || 3000

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/incident', incidents)

// View
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// Start server
server.listen(port, function() {
	console.log('Server is fully armed and operational on port: ' + port)
})