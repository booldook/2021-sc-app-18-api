const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { v4: uuid } = require('uuid')
const { pool } = require('../../modules/mysql-init')

router.get(['/', '/:idx'], async (req, res, next) => {
	res.locals.js = 'dev/create'
	let data = {}
	try {
		if(req.params.idx) {
			let sql = " SELECT * FROM users_api WHERE idx=? "
			let [[rs]] = await pool.execute(sql, [req.params.idx])
			data.userid = rs.userid
			data.domain = rs.domain
			data.apikey = rs.apikey
		}
		res.render('dev/create', { data })
	}
	catch(err) {
		next(createError(err))
	}
})

router.post('/', async (req, res, next) => {
	try {
		let { userid, domain } = req.body
		let sql = " SELECT * FROM users_api WHERE userid=? "
		let [rs] = await pool.execute(sql, [userid])
		if(rs.length === 1) {
			sql = " UPDATE users_api SET domain=? WHERE userid=?"
			await pool.execute(sql, [domain, userid]) 
			res.redirect('/api/dev/'+rs[0].idx)
		}
		else {
			sql = " INSERT INTO users_api SET userid=?, domain=?, apikey=? "
			let [rs2] = await pool.execute(sql, [userid, domain, uuid()])
			res.redirect('/api/dev/'+rs2.insertId)
		}
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router