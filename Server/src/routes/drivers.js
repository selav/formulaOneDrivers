const express = require('express');
const router = express.Router();

const driversController = require('../controllers/driversController')

/* GET users listing. */
router.get('/list', driversController.getDriversList);
router.get('/driver/:driverId/:token', driversController.getRacesDataByDriver);
router.post('/driver/like', driversController.likeDriver);
router.get('/driver/isLiked/:driverId/:token', driversController.isLiked);

module.exports = router;
