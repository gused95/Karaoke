const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");

/* GET home page */
router.get("/", isLoggedOut,(req, res, next) => {
  
  res.render("index",{correo:req.session.correo});
});

module.exports = router;
