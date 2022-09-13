const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  
  res.render("index",{correo:req.session.correo});
});

const app = require("../app");


module.exports = router;
