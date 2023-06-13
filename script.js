const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const preBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progress_container = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ["Contra", "HavestMoon", "Mario"];
let index = 1;

function loadSongs(song){
    title.innerText = `Name: ${song}.mp3`;
    cover.src = `cover/${song}.jpg`;
    audio.src = `music/${song}.mp3`;
}

loadSongs(songs[index]);

playBtn.addEventListener('click', () => {
    const isPlay = musicContainer.classList.contains('play');

    if(isPlay){
        pauseSong();
    }else{
        playSong();
    }
});
preBtn.addEventListener('click', ()=>{
    index--;
    if(index < 0){
        index = songs.length-1;
    }
    loadSongs(songs[index]);
    playSong();
});
nextBtn.addEventListener('click', () => {
    index++;
    if(index>songs.length-1){
        index = 0;
    }
    loadSongs(songs[index]);
    playSong();
});

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');
    audio.play();
}
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');
    audio.pause();
}

audio.addEventListener('timeupdate', updateprogress);

function updateprogress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration)*100;

    progress.style.width =   `${progressPercent}%`
}

progress_container.addEventListener('click', setProgress);

function setProgress(e){
    const width = this.clientWidth;
    const clickx = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickx/width)*duration;
}
function nextSong(){
    index++;
    if(index>songs.length-1){
        index = 0;
    }
    loadSongs(songs[index]);
    playSong();
}

audio.addEventListener('ended', nextSong);