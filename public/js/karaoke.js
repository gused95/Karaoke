// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;
let currentSong = 0;
let playlist = [];
let noSongs = true;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '660',
        width: '940',
        videoId: '0ktP6ZacKGg',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    fetchSongs()
    setInterval(fetchSongs, 10000);
}

function onStateChange(event){
    if (event.data === 0) {
        playNextSong();
    }
}

function playNextSong() {
    currentSong++;

    if (currentSong < playlist.length) {
        const nextSong = playlist[currentSong];
        player.loadVideoById(nextSong.videoId);
    } else {
        noSongs = true
    }
}

function updatePlaylist(songs) {
    playlist = songs;
    const song = playlist[currentSong]

    if (noSongs && song) {
        player.loadVideoById(song.videoId)
        noSongs = false
    }
}

function fetchSongs() {
    const event = document.querySelector('#event')
    return fetch(`/karaoke/${event.dataset.id}/songs`)
        .then((response) => response.json())
        .then(updatePlaylist)
}