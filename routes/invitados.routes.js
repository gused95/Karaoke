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
    const { name, code } = req.body;

    if (!name || !code ) {
        return res.status(400).render("invitados/sesion-invitado", {
        errorMessage: "Por favor verifique los datos.",
        });
    }
    Event.findOne({ code: code })
        .then((event) => {
            if(event) {
                return Guest.create({
                    event: event,
                    name: req.body.name
                })
            }
            return res.render("invitados/sesion-invitado", {
                errorMessage: "Por favor verifique su código.",
                });
            
        })
        .then((guest) => {
            req.session.guestId = guest._id
            console.log(req.session)
            res.redirect(`/user/events/${guest.event._id}`)
        }).
        catch((err) => console.error(err))
})

module.exports = router;