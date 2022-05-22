console.log("Roshan")
// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('music/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myprogressBar = document.getElementById('myprogressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')

let songItems = Array.from(document.getElementsByClassName("songItem"))

let songs = [
    {
        songName: "A/B black in black", filePath: 'music/1.mp3', coverPath: "avenger.jpg"
    }
    ,
    {
        songName: "Kal Ho Na Ho", filePath: 'music/2.mp3', coverPath: "saru.jpg"
    }
    ,
    {
        songName: "mickal Dangreous", filePath: 'music/3.mp3', coverPath: "mickal.jpg"
    },
    {
        songName: "Shakira Waka Waka", filePath: 'music/4.mp3', coverPath: "shakira.jpg"
    },
    {
        songName: "Tokiyo Drift", filePath: 'music/5.mp3', coverPath: "tokiyo.jpg"
    }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
})
// let audioElement = new Audio('music.mp3')
// audioElement.play();

// Handle play/pause clicks
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = "1"

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = "0"

    }
})

// listen to events
audioElement.addEventListener('timeupdate', () => {

    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myprogressBar.value = progress;
})
myprogressBar.addEventListener("change", () => {
    audioElement.currentTime = myprogressBar.value * audioElement.duration / 100;
})

makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play")

    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        audioElement.src = ` music/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = "1"
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 4) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }
    audioElement.src = ` music/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1
    }
    audioElement.src = ` music/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})
