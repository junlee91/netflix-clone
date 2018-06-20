import "./styles.css";

const header = document.querySelector(".js-header"),
  video = document.querySelector(".js-video"),
  muteBtn = document.querySelector(".js-muteBtn"),
  playBtn = document.querySelector(".js-playBtn");

video.autoplay = true;
video.loop = true;
video.volume = 1;

const handleScroll = event => {
  const scrollHeight = window.scrollY;

  if (scrollHeight > 100) {
    header.classList.add("black");
    video.pause();
  } else {
    header.classList.remove("black");
    video.play();
  }
};

const handleMuteBtnClick = () => {
  if(video.muted) {
    video.muted = false;
    muteBtn.innerHTML = "Mute";
  } else {
    video.muted = true;
    muteBtn.innerHTML = "Unmute";
  }
}

window.addEventListener("scroll", handleScroll);
muteBtn.addEventListener("click", handleMuteBtnClick);
playBtn.addEventListener("click", handlePlayBtnClick);