const { json } = require('express')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { pool } = require('../../modules/mysql-init')

router.get('/', async (req, res, next) => {
	let token = req.headers.authorization
	let sql
	try {
		jwt.verify(token, process.env.JWT_SALT, async (err, decode) => {
			if(err) {
				res.status(401).json({ err: '토큰이 만료되었습니다.' })
			}
			else {
				sql = " SELECT * FROM books ORDER BY idx DESC "
				const [books] = await pool.execute(sql)
				res.status(200).json({ success: true, books })
			}
		})
	}
	catch(err) {
		res.status(500).json(err)
	}
})

module.exports = router