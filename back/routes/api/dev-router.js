const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
// const { pool } = require('../../modules/mysql-init')

router.get('/', (req, res, next) => {
	res.locals.css = 'dev/create'
	res.locals.js = 'dev/create'
	res.render('dev/create')
})

module.exports = router