const router = require('express').Router()
const responseList = require('../configs/response.config')
const User = require("../models/user.model")
const authenticateUser = require("../middlewares/auth.middleware")
require('dotenv').config()

//Display artworks posted in myArt
router.get("/", authenticateUser, async (req, res) => {
  try{
    const userinfo = await User.find({ "_id": req.user.id});
      res.status(200).json({ userinfo });
    } catch (e) {
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
});

  router.put("/", authenticateUser, async (req, res) => {
    try {
      const userData = req.body.data;
      await User.findByIdAndUpdate(req.body.id, { $set:userData });
      res.status(200).json({ message: responseList.CREATED_SUCCESS });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
  });

  module.exports = router