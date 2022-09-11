//1 Importamos Express
const express = require("express");
//2 Inicializamos el router
const router = express.Router();


const {google} = require('googleapis');
const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

router.get("/", (req,res) =>{
    res.render("karaoke/show");
})

router.get("/busqueda", (req,res) =>{
    res.render("karaoke/busqueda");
})

router.post("/busqueda", (req, res) => {
    youtube.search.list({
        part: "snippet", 
        type: "video",
        maxResults: 50,
        q: req.body.busqueda + " karaoke"
    })
    .then(resultado =>{
        res.render("karaoke/busqueda", {items: resultado.data.items})
    })
    .catch(err => console.log(err))
    
})


module.exports = router;