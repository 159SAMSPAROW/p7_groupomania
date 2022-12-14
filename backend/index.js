const helmet = require('helmet')
const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/auth.middleware')
const cors = require('cors')
const apiLmiter = require ('./middleware/rate-limit')

const app = express()

app.use(helmet())
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(apiLmiter)
// jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
