const router = require("express").Router();

const mongoose = require('mongoose');
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/sesion-invitado",isLoggedOut,(req,res)=>{
    res.render('invitados/sesion-invitado')
})

module.exports = router;