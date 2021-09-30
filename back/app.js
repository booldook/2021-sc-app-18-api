// npm i express uuid dotenv cors ejs mysql2 http-errors jsonwebtoken lodash numeral moment morgan fs-extra


/*************** global init **************/
require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')


/*************** server init **************/
require('./modules/server-init')(app, process.env.PORT)


/************** view engine ***************/
app.set('view engine', 'ejs')
app.set('views', './views')
app.locals.pretty = true


/*************** middleware ***************/
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/*************** static init **************/
app.use('/', express.static(path.join(__dirname, 'public')))


/*************** router init **************/
const apiRouter = require('./routes/api')
const api2Router = require('./routes/api2')
const devRouter = require('./routes/dev')
app.use('/api', apiRouter)
app.use('/api2', api2Router)
app.use('/dev', devRouter)


app.get('/token', (req, res, next) => {
	let token = jwt.sign({ 
		userid: 'booldook', 
		nickname: '불뚝' 
	}, 
	process.env.JWT_KEY, { expiresIn: 60 * 60 });
	res.send(token)
})


/**************** error init **************/
const _404Router = require('./routes/error/404-router')
const _500Router = require('./routes/error/500-router')

app.use(_404Router)
app.use(_500Router)

