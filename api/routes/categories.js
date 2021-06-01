const router = require("express").Router();
const Categorie = require("../models/Categorie");


// create Category
router.post("/", async (req, res) => {
  const newCat = new Categorie(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get Category

  router.get("/", async (req, res) => {
    try {
      const cats = await Categorie.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });
 
module.exports = router;