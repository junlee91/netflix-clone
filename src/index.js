import "./styles.css";

const header = document.querySelector(".js-header"),
  video = document.querySelector(".js-video"),
  muteBtn = document.querySelector(".js-muteBtn"),
  playBtn = document.querySelector(".js-playBtn"),
  range = document.querySelector(".js-range");
  
video.autoplay = true;
video.loop = true;

const loadMutedPreference = () => {
  const mutedPref = localStorage.getItem("muted");
  if (mutedPref !== null) {
    if (mutedPref === "true") {
      video.muted = true;
      muteBtn.innerHTML = "Unmute";
    } else {
      video.muted = false;
      muteBtn.innerHTML = "Mute";
    }
  } else {
    video.muted = false;
    muteBtn.innerHTML = "Mute";
  }
};

const handleScroll = event => {
  const scrollHeight = window.scrollY;

  // Top Header
  if (scrollHeight > 50) {
    header.classList.add("black");
  } else {
    header.classList.remove("black");
  }

  // Video Play
  if (scrollHeight > 250) {
    video.pause();
  } else {
    video.play();
  }
};

const handleMuteBtnClick = () => {
  if(video.muted) {
    video.muted = false;
    muteBtn.innerHTML = "Mute";
    localStorage.setItem("muted", false);
  } else {
    video.muted = true;
    muteBtn.innerHTML = "Unmute";
    localStorage.setItem("muted", true);
  }
}

const handlePlayBtnClick = () => {
  if (video.paused) {
    playBtn.innerHTML = "⏸";
    video.play();
  } else {
    playBtn.innerHTML = "▶️";
    video.pause();
  }
};

const handleRageChange = event => {
  const currentVolume = event.target.value;
  video.volume = currentVolume;
};

const handleContentLoaded = () => {
  window.addEventListener("scroll", handleScroll);
  muteBtn.addEventListener("click", handleMuteBtnClick);
  playBtn.addEventListener("click", handlePlayBtnClick);
  range.addEventListener("change", handleRageChange);
}
loadMutedPreference();

document.addEventListener("DOMContentLoaded", handleContentLoaded);