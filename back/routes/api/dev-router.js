const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/', (req, res, next) => {
	res.locals.js = 'dev/create'
	res.render('dev/create')
})

router.post('/', async (req, res, next) => {
	res.json(req.body)
})

module.exports = router