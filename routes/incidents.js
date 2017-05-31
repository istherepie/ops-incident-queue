'use strict'

// Modules
const router = require('express').Router()
const redis = require('redis')

// Constants
const client = redis.createClient()
const key = 'mykeys'

// Development Only
if ( process.env.NODE_ENV === 'development') {
	client.flushall()
}

// REDIS
function listIncidents(req, res, next) {
	client.hgetall(key, (err, result) => {
		req.incidents = result
		next()
	})
}

// List all incidents
router.get('/all', listIncidents, (req, res) => {
		res.json({ request: 'ok', date: Date.now(), incidents: req.incidents })
	})

// Create new incident
router.put('/create', (req, res) => {
	if (!req.body) {
		return res.status(400).json({ error: 'Invalid request' })
	}

	let payload = {
		host: req.body.host,
		alias: req.body.alias,
		address: req.body.address,
		state: req.body.state,
		time: req.body.time,
		info: req.body.info
	}

	client.hset(key, Date.now(), payload)

	res.status(200)
})

// Export
module.exports = router