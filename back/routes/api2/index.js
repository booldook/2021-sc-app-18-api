const express = require('express')
const router = express.Router()
const apiRouter = require('./api-router')
const signRouter = require('./sign-router')

router.use('/', apiRouter)
router.use('/sign', signRouter)

module.exports = router