// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Song = require("../models/Song.model");
const Comment = require("../models/Comment.model");
const Guest = require("../models/Guest.model");

const axios = require("axios");
// all your routes here
const isLoggedIn = require("../middleware/isLoggedIn");

//Request the model
const Event = require("../models/Event.model")

//localhost:3000/user-profile
router.get("/user-profile", (req, res) => { 
    Event.find({ user: req.session.user._id })
    .then(events => {
        res.render("users/user-profile",{
            user: req.session.user,
            events: events
        });
    })
    .catch(err => console.log(err))
    
});

//localhost:3000/user/new-event
router.get("/new-event", (req, res) => {
    res.render("users/user-new-event", {user: req.session.user});
});

//localhost:3000/user/events/:id
router.get("/events/:id", (req, res) => {
    Event
        .findById(req.params.id)
        .populate('user')
        .then(event => {
            Song
                .find({ event: event._id })
                .populate('guest')
                .then((songs) => {
                    Comment
                        .find({event: event._id })
                        .populate('guest')
                        .then((comments) => {
                            res.render("users/event-details", { songs, comments, event, user: req.session.user });
                        })
                })
        })
        .catch(err => console.log(err))    
});

//localhost:3000/user/edit-event
router.get("/edit-event/:id", (req, res) => {
    Event.findById(req.params.id)
        .then((event) => {
            res.render("users/edit-event", {event, user: req.session.user})
        })
        .catch(err => console.log(err))
});


router.post("/edit-event/:id", (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(newEvent =>{
        res.redirect("/user/user-profile")
    })
    .catch(err =>{console.log(err)})

})

router.post("/delete/:id", (req,res) =>{
    Event.findByIdAndRemove(req.params.id)
    .then(
        res.redirect("/user/user-profile")
    )
    .catch(err =>{console.log(err)}) 
})

router.post("/event-details", (req,res) =>{
    Guest.findById(req.session.guestId)
        .then(guest =>{
            Comment.create({ ...req.body, guest: guest, event: guest.event})
                .then(comment => {
                    res.redirect(`/user/events/${comment.event}`)
                })
        })
        .catch(err => console.log(err))
})

 router.post("/send-invitation", (req,res) =>{
    console.log(req.session)
    console.log(req.body)
    console.log(req.query)
    const {eventName, eventDate, eventId, eventCode} = req.query
    const {mail} = req.body
    const{nombre} = req.session.user
    const data = {
        service_id: process.env.SERVICE_ID,
        template_id: process.env.TEMPLATE_ID,
        user_id: process.env.PUBLIC_KEY,
        template_params: {
          correo: mail,
          eventName:eventName,
          eventId: eventId,
          user: nombre,
          date: eventDate, 
          eventCode: eventCode,
        },
        accessToken: process.env.PRIVATE_KEY,
      };
      const url = "https://api.emailjs.com/api/v1.0/email/send";
      axios({
        method: "post",
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      })
        .then((result) => {
          console.log(result);
          console.log("Correo enviado :)");
          res.redirect(`/user/events/${eventId}`)
        })
        .catch((err) => {
          console.log(err);
        })
}) 

// localhost:3000/user/new-event
router.post("/new-event", (req, res) => {
    const caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    let genCode = "";
    for (i=0; i<6; i++) genCode +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 

    const atributos = {...req.body, code: genCode, user: req.session.user}
    
    //Create a new event
    Event.create(atributos).then(newEvent => {
        console.log(newEvent);
        res.redirect("/user/user-profile")
    })
});

module.exports = router;