// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const isLoggedIn = require("../middleware/isLoggedIn");

//Request the model
const Event = require("../models/Event.model")

//localhost:3000/user-profile
router.get("/user-profile", (req, res) => { 
    Event.find()
    .then(events => {
        res.render("users/user-profile",{correo:req.session.user.correo, nombre:req.session.user.nombre, events:events});
    })
    .catch(err => console.log(err))
    
});

//localhost:3000/user/new-event
router.get("/new-event", (req, res) => {
    res.render("users/user-new-event");
});

//localhost:3000/user/event-details
router.get("/event-details", (req, res) => {
    res.render("users/event-details");
});

//localhost:3000/user/edit-event
router.get("/edit-event/:id", (req, res) => {
    Event.findById(req.params.id)
        .then((event) => {
            res.render("users/edit-event", {event})
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


// localhost:3000/user/new-event
router.post("/new-event", (req, res) => {
    const caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
       let genCode = "";
       for (i=0; i<6; i++) genCode +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
       console.log(genCode)

    const atributo = {...req.body, code:genCode}
    console.log(req.body);
    //Create a new event
    Event.create(atributo).then(newEvent => {
        console.log(newEvent);
        res.redirect("/user/user-profile")
    })
});

module.exports = router;