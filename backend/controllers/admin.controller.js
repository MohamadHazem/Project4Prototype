const router = require('express').Router()
const responseList = require('../configs/response.config')
const User = require("../models/user.model")
const Car = require("../models/car.model");
const authenticateUser = require("../middlewares/auth.middleware")
require('dotenv').config()

//Display cars posted by Admin
router.get("/", authenticateUser, async (req, res) => {
  try{
    const car = await Car.find({ "createdBy.user": req.user.id, quantity: {$ne:0}});
      res.status(200).json({ car });
    } catch (e) {
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
});
  
 router.post("/", authenticateUser, async (req, res) => {
   try {
    console.log (req.body);
     const car = new Car(req.body);
     car.createdBy.user = req.user.id;
     car.createdBy.fullName = req.user.fullName;
     await car.save();
     await User.findByIdAndUpdate(req.user.id, { $push: { cars: car._id } });
     res.status(200).json({ message: responseList.CREATED_SUCCESS });
   } catch (e) {
    console.log (e)
     res.status(400).json({ message: responseList.BAD_REQUEST });
   }
 });

  router.put("/", authenticateUser, async (req, res) => {
    try {
      const car = req.body.data;
      await Car.findByIdAndUpdate(req.body.id, { $set:car });
      res.status(200).json({ message: responseList.CREATED_SUCCESS });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
  });

  router.delete("/", authenticateUser, async (req, res) => {
    try {
      console.log(req.body);
      await Car.findByIdAndUpdate(req.body.id, { $set:{quantity:0} });
      res.status(200).json({ message: responseList.DELETED_SUCCESS });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: responseList.DELETED_FAILED });
    }
  });

  module.exports = router