//1 Importamos Express
const express = require("express");
//2 Inicializamos el router
const router = express.Router();


const {google} = require('googleapis');
const Guest = require("../models/Guest.model");
const Song = require("../models/Song.model");
const Event = require("../models/Event.model");

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

router.post("/list", (req,res) =>{
    youtube.videos.list({
        part: "snippet",
        id: req.body.videoId,
    })
    .then(videoInfo =>{
        let video = videoInfo.data.items[0];
        let position;
        return Guest.findById(req.session.guestId).then((guest) => {
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
                    guest,
                    event: guest.event,
                });
            });
        });
    })
    .then(song => {
        res.redirect(`/user/events/${song.event}`);
    })
    .catch(err => console.log(err))
})

router.get("/search", (req,res) =>{
    res.render("karaoke/search", {user: req.session.user});
})

router.post("/search", (req, res) => {
    youtube.search.list({
        part: "snippet", 
        type: "video",
        videoEmbeddable: true,
        maxResults: 50,
        q: req.body.busqueda + " karaoke"
    })
    .then(resultado =>{
        res.render("karaoke/search", {items: resultado.data.items, user: req.session.user})
    })
    .catch(err => console.log(err))
    
})

router.get("/:id", (req,res) => {
    Event.findById(req.params.id).then((event) => {
        res.render("karaoke/show", {user: req.session.user, event});
    })
})

router.get("/:id/songs", (req, res) => {
    Song.find({ event: req.params.id }).sort('position').then((songs) => {
        res.json(songs)
    })
})

module.exports = router;