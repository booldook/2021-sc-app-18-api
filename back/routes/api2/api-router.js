const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { pool } = require('../../modules/mysql-init')

router.get('/', async (req, res, next) => {
	let sql, token
	try {
		if(req.cookies.token) {
			const verifyToken = jwt.verify(req.cookies.token, process.env.JWT_SALT)
			token = jwt.sign({ data: verifyToken.data }, process.env.JWT_SALT, { expiresIn: '10s' })
		}
		else {
			sql = " SELECT * FROM users_api WHERE apikey=? "
			const [rs] = await pool.execute(sql, [req.query.apikey])
			token = jwt.sign({ data: rs[0] }, process.env.JWT_SALT, { expiresIn: '10s' })
		}
		res.cookie('token', token, { expires: new Date(Date.now() + 10000) }).json({ success: true, msg: '쿠키발행' })
	}
	catch(err) {
		res.status(500).json(err)
	}
})

module.exports = router