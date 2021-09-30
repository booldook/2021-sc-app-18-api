const { json } = require('express')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { pool } = require('../../modules/mysql-init')

router.get('/', async (req, res, next) => {
	let sql
	try {
		res.cookie('test', '3100')
		console.log(req.cookies)
		res.json({ success: true, cookieData: req.cookies.test })
		if(req.cookies) {
		}
		else {
			res.json({ success: true, msg: '쿠키발행' })
		}
	}
	catch(err) {
		res.status(500).json(err)
	}
})

module.exports = router