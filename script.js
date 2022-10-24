console.log("Welcome to Audify");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar =  document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "LEGION", filePath: "song/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "TRAP", filePath: "song/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "They Mad", filePath: "song/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Rich the Kid", filePath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Song Title", filePath: "song/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "The Safety Dance", filePath: "song/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Back it up", filePath: "song/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Let me Love You", filePath: "song/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Orange", filePath: "song/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "True Love", filePath: "song/10.mp3", coverPath: "covers/10.jpg"},

] 

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//audioElement.play();
const getCurrentSongIdx = function() {
    const arr = audioElement.src.split('/');
    return parseInt(arr[arr.length - 1].split('.')[0]) - 1;
}

const toggleSong = function() {
    const songIdx = getCurrentSongIdx();
    const ele = document.getElementsByClassName("songItemPlay")[songIdx];
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        ele.classList.remove('fa-play-circle');
        ele.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        ele.classList.remove('fa-pause-circle');
        ele.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    toggleSong();
})



window.addEventListener('keydown', (event)=>{
    if (event.keyCode == 32){
        toggleSong();
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    if(!progress) {
        progress = 0;
    }
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = (id)=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    if(element.id !== id) {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    }
    })
}

const playSong = (songIdx) => {
    const ele = document.getElementsByClassName("songItemPlay")[songIdx];

    audioElement.src = `songs/${songIdx+1}.mp3`;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    ele.classList.remove('fa-play-circle');
    ele.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    audioElement.currentTime = 0;

    masterSongName.innerText = songs[songIdx].songName;
}

Array.from(document.getElementsByClassName('songItem')).forEach((element) =>{
    element.addEventListener('click', (e)=> {
        let obj = e.target;
        if(e.target.className !== "songItem") {
            obj = findAncestor(e.target, "songItem");
        }
        const currentPlayingIdx = parseInt(getCurrentSongIdx());
        const clickedSongIdx = parseInt(obj.getElementsByClassName("songItemPlay")[0].id);
        if(currentPlayingIdx === clickedSongIdx) {
            toggleSong();
        } else {
            if(currentPlayingIdx) {
                const ele = document.getElementsByClassName("songItemPlay")[currentPlayingIdx];
                ele.classList.remove('fa-pause-circle');
                ele.classList.add('fa-play-circle');
            }
            playSong(clickedSongIdx);
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}
