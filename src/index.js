import "./styles.css";

const header = document.querySelector(".js-header"),
  video = document.querySelector(".js-video"),
  muteBtn = document.querySelector(".js-muteBtn"),
  playBtn = document.querySelector(".js-playBtn"),
  range = document.querySelector(".js-range"),
  boxes = document.querySelectorAll(".box");

// Default volume setting
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

// ------------------------ Header Settings ------------------------
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

// ------------------------ Video Settings ------------------------
const handleMuteBtnClick = () => {
  if (video.muted) {
    video.muted = false;
    muteBtn.innerHTML = "Mute";
    localStorage.setItem("muted", false);
  } else {
    video.muted = true;
    muteBtn.innerHTML = "Unmute";
    localStorage.setItem("muted", true);
  }
};
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

// ------------------------ Box Settings ------------------------
const boxArray = Array.from(boxes);

const findPreviousBoxes = element => {
  const foundPreviousBoxes = [];
  const findPrevious = element => {
    if (element !== null) {
      foundPreviousBoxes.push(element);
    }
  };
  findPrevious(element.previousSibling);
};

const handleBoxMouseOver = event => {
  const box = event.target;
  const previousOne = box.previousElementSibling;
  const nextOne = box.nextElementSibling;

  previousOne.classList.add("previous");
  nextOne.classList.add("next");
};

const handleBoxMouseLeave = event => {
  const box = event.target;
  const previousOne = box.previousElementSibling;
  const nextOne = box.nextElementSibling;

  previousOne.classList.remove("previous");
  nextOne.classList.remove("next");
};

// ------------------------ Listener Settings ------------------------
const handleContentLoaded = () => {
  window.addEventListener("scroll", handleScroll);
  muteBtn.addEventListener("click", handleMuteBtnClick);
  playBtn.addEventListener("click", handlePlayBtnClick);
  range.addEventListener("change", handleRageChange);

  boxArray.forEach(box => {
    box.addEventListener("mouseover", handleBoxMouseOver);
    box.addEventListener("mouseleave", handleBoxMouseLeave);
  });

  video.autoplay = true;
  video.loop = true;
};
loadMutedPreference();

document.addEventListener("DOMContentLoaded", handleContentLoaded);
