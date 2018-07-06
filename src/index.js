import "./styles.css";
import "./js/utils";
import "./js/featuredSlider";

const header = document.querySelector(".js-header"),
  video = document.querySelector(".hero-video__file"),
  muteBtn = document.querySelector(".js-muteBtn"),
  playBtn = document.querySelector(".js-playBtn"),
  range = document.querySelector(".js-range"),
  boxes = document.querySelectorAll(".box");

// Default volume setting
const loadMutedPreference = () => {
  const mutedPref = localStorage.getItem("muted");
  if (mutedPref !== null) {
    if (mutedPref === "true") {
      muteSound();
    } else {
      unmuteSound();
    }
  } else {
    unmuteSound();
  }
};

const muteSound = () => {
  video.muted = true;
  muteBtn.innerHTML = `<i class="fa fa-volume-off fa-lg"></i>`;
};
const unmuteSound = () => {
  video.muted = false;
  muteBtn.innerHTML = `<i class="fa fa-volume-up fa-lg"></i>`;
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
    unmuteSound();
    localStorage.setItem("muted", false);
  } else {
    muteSound();
    localStorage.setItem("muted", true);
  }
};
// const handlePlayBtnClick = () => {
//   if (video.paused) {
//     playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
//     video.play();
//   } else {
//     playBtn.innerHTML = `<i class="fa fa-play"></i>`;
//     video.pause();
//   }
// };
const handleRageChange = event => {
  const currentVolume = event.target.value;
  video.volume = currentVolume;
};

// ------------------------ Box Settings ------------------------
const boxArray = Array.from(boxes);

const findAllNext = element => {
  const foundList = [];
  const findNext = element => {
    if (element !== null) {
      foundList.push(element);
      const previousElement = element.nextElementSibling;
      if (previousElement !== null) {
        findNext(previousElement);
      }
    }
  };
  findNext(element.nextElementSibling);
  return foundList;
};

const findAllPrevious = element => {
  const foundList = [];
  const findPrevious = element => {
    if (element !== null) {
      foundList.push(element);
      const previousElement = element.previousElementSibling;
      if (previousElement !== null) {
        findPrevious(previousElement);
      }
    }
  };
  findPrevious(element.previousElementSibling);
  return foundList;
};

const handleBoxMouseEnter = event => {
  const target = event.target;
  const nextElements = findAllNext(target);
  const previousElements = findAllPrevious(target);
  nextElements.forEach(element => {
    element.classList.add("next");
  });
  previousElements.forEach(element => {
    element.classList.add("previous");
  });
};

const handleBoxMouseLeave = event => {
  const { target } = event;
  boxArray.forEach(box => {
    box.classList.remove("next", "previous");
  });
};

// ------------------------ Listener Settings ------------------------
const handleContentLoaded = () => {
  window.addEventListener("scroll", handleScroll);
  muteBtn.addEventListener("click", handleMuteBtnClick);
  // playBtn.addEventListener("click", handlePlayBtnClick);
  range.addEventListener("change", handleRageChange);

  boxArray.forEach(box => {
    box.addEventListener("mouseover", handleBoxMouseEnter);
    box.addEventListener("mouseleave", handleBoxMouseLeave);
  });

  video.autoplay = true;
  video.loop = true;
};
loadMutedPreference();

document.addEventListener("DOMContentLoaded", handleContentLoaded);
