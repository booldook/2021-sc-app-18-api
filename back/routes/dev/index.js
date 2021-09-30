const express = require('express')
const router = express.Router()
const devRouter = require('./dev-router')

router.use('/', devRouter)

module.exports = router