const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");

/* GET home page */
router.get("/", (req, res, next) => {
  const {correo} = req.session
  res.render("index",{correo: correo});
});





module.exports = router;
