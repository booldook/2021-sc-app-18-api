const path = require('path')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { pool } = require('../../modules/mysql-init')

router.post('/', async (req, res, next) => {
	let { userid, apikey, domain = req.headers.origin } = req.body
	let sql, token, data
	try {
		sql = " SELECT * FROM users_api WHERE userid=? AND apikey=? AND domain=? "
		const [rs] = await pool.execute(sql, [userid, apikey, domain])
		if(rs.length === 1) {	// token발행
			data = { idx: rs[0].idx, userid: rs[0].userid }
			token = jwt.sign(data, process.env.JWT_SALT, { expiresIn: '10s' })
			res.status(200).json({ success: true, token })
		}
		else {	// Error
			res.status(200).json({ success: false, msg: '인증되지 않은 사용자 입니다.' })
		}
	}
	catch(err) {
		res.status(500).json(err)
	}
})

module.exports = router