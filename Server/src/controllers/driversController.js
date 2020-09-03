const { wrap } = require('../services/error-wrap')
const driversProvider = require('../providers/driversProvider');

module.exports = {
   getDriversList: wrap( async (req,res,next) => {
      const result = await driversProvider.getDriversList()
      res.status(200).send(result);
   }),
   getRacesDataByDriver: wrap( async (req,res,next) => {
      const {driverId} = req.params;
      const result = await driversProvider.getRacesDataByDriver(driverId);
      res.status(200).send(result);
   }),
}