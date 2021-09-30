const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/', (req, res, next) => {
	res.render('dev/create')
})

router.post('/', async (req, res, next) => {
	res.render('dev/create')
})

module.exports = router