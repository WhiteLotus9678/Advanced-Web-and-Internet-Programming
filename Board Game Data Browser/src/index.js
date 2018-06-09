let Express = require('express')

// Bringing in the router from data.js
let apiRouter = require('../api/data').router

// Make an HTTP server
let app = new Express()

// Setup a filter for ALL HTTP requests
app.use((req, res, next) => {
    console.info(`${req.method} request at ${req.url}`)

    // Filters out bad requests right away
    next()
})

// Route request through our data API endpoint
app.use('/api', apiRouter)

// Look for static content to satisfy the request (static file serve)
app.use(Express.static('./dist'))
app.use(Express.static('./public'))

// Start the server
app.listen(3000)
console.info('Server listening on port 3000')