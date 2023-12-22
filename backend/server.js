const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const colors = require('colors')
const compression = require('compression')
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000
connectDB()

const app = express()

const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
})
app.use(limiter)
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(compression())
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(
    `Server started on port ${port}`
))