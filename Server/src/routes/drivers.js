const express = require('express');
const router = express.Router();

const driversController = require('../controllers/driversController')

/* GET users listing. */
router.get('/list', driversController.getDriversList);
router.get('/driver/:driverId', driversController.getRacesDataByDriver);

module.exports = router;
