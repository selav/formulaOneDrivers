const { wrap } = require('../services/error-wrap')
const driversProvider = require('../providers/driversProvider');

module.exports = {
   getDriversList: wrap( async (req,res,next) => {
      const result = await driversProvider.getDriversList()
      res.status(200).send(result);
   }),
   getRacesDataByDriver: wrap( async (req,res,next) => {
      //todo: check input validity
      const {driverId,token} = req.params;
      const result = await driversProvider.getRacesDataByDriver(driverId,token);
      res.status(200).send(result);
   }),
   getDriverData: wrap( async (req,res,next) => {
      //todo: check input validity
      const {driverId} = req.params;
      const result = await driversProvider.getDriverData(driverId);
      res.status(200).send(result);
   }),
   likeDriver: wrap( async (req,res,next) => {
      //todo: check input validity
      const {token,driverId,likeState} = req.body;
      const result = await driversProvider.likeDriver(token,driverId,likeState);
      res.status(200).send(result);
   }),
   isLiked: wrap( async (req,res,next) => {
      //todo: check input validity
      const {token,driverId} = req.params;
      const result = await driversProvider.isLiked(token,driverId);
      res.status(200).send(result);
   }),
}