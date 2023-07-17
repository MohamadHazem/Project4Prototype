const router = require("express").Router();
const Car = require("../models/car.model");
const responseList = require('../configs/response.config');

//Display cars posted in Home
router.get("/", async (req, res) => {
  try{
    const car = await Car.find();
      res.status(200).json({ car });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
});

router.get('/search/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm
  try {
    const car = await Car.find({
      $or: [
        {name: {
          $regex: searchTerm, $options: 'i'
        }},
        {description: {
          $regex: searchTerm, $options: 'i'
        }},
        {'createdBy.fullName': {
          $regex: searchTerm, $options: 'i'
        }},
      ]
    })
    res.status(200).json({ car })
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: responseList.SOMETHING_WRONG})
  }
})

module.exports = router