// my-app/server/controllers/data-controller.js
// Import database
const knex = require('./../db')
// Retrieve all daily_data
exports.dailyDataAll = async (req, res) => {
    var year = new Date().getFullYear();
    if (req.query.n === -1) {
      knex
        .select("*") // select all records
        .from("daily_data_max") // from 'books' table
        .where("id", "like", `%${year}%`)
        .orderBy("id", "desc")
        .limit(req.query.n)
        .then((dailyData) => {
          // Send data extracted from database in response
          res.json(dailyData);
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving daily data: ${err}` })
          })
    } else if (req.query.n === -2) {
      knex
        .select("*") // select all records
        .from("daily_data_max") // from 'books' table
        .orderBy("id", "desc")
        .then((dailyData) => {
          // Send data extracted from database in response
          res.json(dailyData);
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving daily data: ${err}` })
          })
    } else {
      knex
        .select('*') // select all records
        .from('daily_data_max') // from 'books' table
        .orderBy('id', 'desc')
        .limit(req.query.n)
        .then(dailyData => {
        // Send data extracted from database in response
        res.json(dailyData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving daily data: ${err}` })
          })
    }
}

// Retrieve specific row from candle_data
exports.candleRowRetrieve = async (req, res) => {
    // Find specific row in the candle_data table 
    // console.log(req.query.id);
    knex('candle_data')
      .where('id', req.query.id) // find correct record based on id
      .then(candleData => {
        // Send a success message in response
        res.json(candleData)
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving ${req.query.id} ohlc data: ${err}` })
      })
  }

// Retrieve specific row from volume_data
exports.volumeRowRetrieve = async (req, res) => { 
    // Find specific row in the volume_data table
    knex('volume')
      .where('id', req.query.id) // find correct record based on id
      .then(volumeData => {
        // Send a success message in response
        res.json(volumeData)
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving ${req.query.id} volume data: ${err}` })
      })
  }
