// my-app/server/routes/data-route.js
// Import express
const express = require('express')
// Import data-controller
const dataRoutes = require('./../controllers/data-controller.js')
// Create router
const router = express.Router()
// Add route for GET request to retrieve all data
// In server.js, books route is specified as '/stock-data'
// this means that '/all' translates to '/stock-data/all'
router.get('/all', dataRoutes.dailyDataAll)
// Add route for GET request to retrieve all data
// In server.js, books route is specified as '/stock-data'
// this means that '/all' translates to '/stock-data/retrieve-candle'
router.get('/retrieve-candle', dataRoutes.candleRowRetrieve)
// Add route for GET request to retrieve all data
// In server.js, books route is specified as '/stock-data'
// this means that '/all' translates to '/stock-data/all'
router.get('/retrieve-volume', dataRoutes.volumeRowRetrieve)
// Export router
module.exports = router