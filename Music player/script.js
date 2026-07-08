const songs = [
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        src: "music/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Believer",
        artist: "Imagine Dragons",
        src: "music/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Shape Of You",
        artist: "Ed Sheeran",
        src: "music/song3.mp3",
        cover: "images/cover3.jpg"
    }
];

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

const playlist = document.querySelectorAll("#playlist li");

let currentSong = 0;
let isPlaying = false;

// Load Song
function loadSong(index) {
    audio.src = songs[index].src;
    cover.src = songs[index].cover;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    playlist.forEach(item => item.classList.remove("active"));
    playlist[index].classList.add("active");
}

loadSong(currentSong);

// Play Song
function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Pause Song
function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Play/Pause
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Next Song
nextBtn.addEventListener("click", () => {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
});

// Previous Song
prevBtn.addEventListener("click", () => {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();
});

// Update Progress
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;

        currentTime.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);
    }

});

// Seek Song
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Format Time
function formatTime(time) {

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

// Auto Next
audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});

// Playlist Click
playlist.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentSong = index;

        loadSong(currentSong);
        playSong();

    });

});