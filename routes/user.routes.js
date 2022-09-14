// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Song = require("../models/Song.model");
const Comment = require("../models/Comment.model");

// all your routes here
const isLoggedIn = require("../middleware/isLoggedIn");

//localhost:3000/user-profile
router.get("/user-profile", (req, res) => {    
    res.render("users/user-profile",{correo:req.session.user.correo, nombre:req.session.user.nombre});
});

//localhost:3000/user-profile/new-event
router.get("/new-event", (req, res) => {
    res.render("users/user-new-event");
});



router.get("/event-details", (req, res) => {
    Song.find()
        .then(songs =>{
            Comment.find()
            .then(comments =>{
                res.render("users/event-details", {songs, comments})
            })   
        })
        .catch(err => console.log(err))
})

router.post("/event-details", (req,res) =>{
    Comment.create(req.body)
    .then( comment =>{
        res.redirect("/user/event-details")  
    })
    .catch(err => console.log(err))
})

router.post("/send-invitation", (req,res) =>{
    
    const data = {
        service_id: "",
        template_id: "",
        user_id: "",
        template_params: {
          nombre: user.name,
          correo: user.email,
          profilePic: user.profilePic,
        },
        accessToken: "",
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
        })
        .catch((err) => {
          console.log(err);
        });
})

module.exports = router;