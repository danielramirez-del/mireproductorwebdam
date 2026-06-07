const video = document.getElementById("video");
const progress = document.getElementById("progress");
const volumeBar = document.getElementById("volumeBar");
const playlistContainer = document.getElementById("playlist");

const playlist = [
  { title: "Video 1", src: "assets/video/lote1.mp4", poster: "assets/img/lote1.png" },
  { title: "Video 2", src: "assets/video/lote2.mp4", poster: "assets/img/lote2.png" },
  { title: "Video 3", src: "assets/video/lote3.mp4", poster: "assets/img/lote3.png" }
];

let i = 0;

// Cargar video
function loadVideo(index) {
  i = index;
  video.src = playlist[i].src;
  video.poster = playlist[i].poster;
  video.load();
  video.play();
}

// Controles
function play() { video.play(); }
function pause() { video.pause(); }
function stop() { video.pause(); video.currentTime = 0; }
function next() { loadVideo((i + 1) % playlist.length); }
function back() { loadVideo((i - 1) % playlist.length); }
function volUp() { setVolume(Math.min(1, video.volume + 0.1)); }
function volDown() { setVolume(Math.max(0, video.volume - 0.1)); }
function toggleLoop() { video.loop = !video.loop; }

function setVolume(value) {
  video.volume = value;
  volumeBar.value = value;
}

// Sincronizar barra de progreso
video.addEventListener("timeupdate", () => {
  progress.value = (video.currentTime / video.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  video.currentTime = (progress.value / 100) * video.duration;
});

// Sincronizar volumen
volumeBar.addEventListener("input", () => setVolume(volumeBar.value));

// Generar playlist visual
playlist.forEach((item, index) => {
  const thumb = document.createElement("img");
  thumb.src = item.poster;
  thumb.alt = item.title;
  thumb.style.width = "100%";
  thumb.style.cursor = "pointer";
  thumb.style.borderRadius = "8px";
  thumb.onclick = () => loadVideo(index);
  playlistContainer.appendChild(thumb);
});

// Inicializar
loadVideo(0);
setVolume(0.5);
