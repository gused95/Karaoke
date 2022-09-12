// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const isLoggedIn = require("../middleware/isLoggedIn");

//localhost:3000/user-profile
router.get("/user-profile", isLoggedIn, (req, res) => {
    res.render("users/user-profile")
});

//localhost:3000/user-profile/new-event
router.get("/new-event", isLoggedIn, (req, res) => {
    res.render("users/user-new-event")
})

module.exports = router;