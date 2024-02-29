import express from 'express'
import configViewEJS from './config/configViewEJS'
import initwebRoute from './routes/web'
import connectDB from './config/connectDB'
import bodyParser from 'body-parser'
import configCors from './config/configCors'
import cookieParser from 'cookie-parser'
import configsocket from './config/configsocket'
require('dotenv').config()

// import jwtAction from '../src/jwt/jwtAction'

const app = express()
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME


//socket
const server = require('http').createServer(app);


//config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//config cookie
app.use(cookieParser())

//Définition des CORS Middleware 
configCors(app)


//connect Db
connectDB()

//config view ejs
// app.set('views', __dirname + '/views')
// app.set('view engine', 'ejs')
configViewEJS(app)

//config web route
initwebRoute(app)

configsocket(server)


app.get('/', (req, res) => {
    res.render("view.ejs")
})

server.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})