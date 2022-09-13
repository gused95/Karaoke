//1 Importamos Express
const express = require("express");
//2 Inicializamos el router
const router = express.Router();


const {google} = require('googleapis');
const Song = require("../models/Song.model");
const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

router.get("/", (req,res) =>{
    res.render("karaoke/show", {correo:req.session.user.correo, nombre:req.session.user.nombre});
})

router.get("/search", (req,res) =>{
    res.render("karaoke/search");
})

router.post("/search", (req, res) => {
    youtube.search.list({
        part: "snippet", 
        type: "video",
        maxResults: 50,
        q: req.body.busqueda + " karaoke"
    })
    .then(resultado =>{
        res.render("karaoke/search", {items: resultado.data.items})
    })
    .catch(err => console.log(err))
    
})

router.post("/list", (req,res) =>{
    youtube.videos.list({
        part: "snippet",
        id: req.body.videoId,
    })
    .then(videoInfo =>{
        let video = videoInfo.data.items[0];
        let position;
        return Song.find().sort({ position: -1 }).limit(1).then((songs) => {
            if (songs.length === 0){
               position = 0; 
            } else {
                position = songs[0].position + 1;
            }
            return Song.create({
                videoId: video.id,
                position: position,
                title: video.snippet.title,
                img: video.snippet.thumbnails.default.url,
            });
        });
    })
    .then(songCreated => {
        res.redirect("/user/event-details");
    })
    .catch(err => console.log(err))
})

router.get("/list", (req,res)=>{
    Song.find()
    .then(songs =>{
        console.log(songs);
        res.render("karaoke/list")
    })
    .catch(err => console.log(err))
})






module.exports = router;