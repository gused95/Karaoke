const router = require("express").Router();

const Guest = require("../models/Guest.model")
const Event = require("../models/Event.model")
const mongoose = require('mongoose');
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/sesion-invitado", isLoggedOut, (req, res)=>{
    res.render('invitados/sesion-invitado')
})

router.post("/", (req, res) => {
    Event.findOne({ code: req.body.code })
        .then((event) => {
            return Guest.create({
                event: event,
                name: req.body.name
            })
        })
        .then((guest) => {
            req.session.guestId = guest._id
            res.redirect(`/user/events/${guest.event._id}`)
        }).
        catch((err) => console.error(err))
})

module.exports = router;