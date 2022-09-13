// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

//localhost:3000/user-profile
router.get("/user-profile", (req, res) => {
    res.render("users/user-profile")
});

//localhost:3000/user-profile/new-event
router.get("/new-event", (req, res) => {
    res.render("users/user-new-event")
})

router.get("/event-details", (req, res) => {
    res.render("users/event-details")
})


module.exports = router;