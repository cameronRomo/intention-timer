// GLOBAL VARIABLES 👇
var dataModel = {
  category: "",
  description: "",
  minutes: "",
  seconds: "",
  completed: false,
  id: "",
}
var pastActivityData = [];
// EVENT LISTENERS 👇
document.querySelector(".activities__icons-section").addEventListener("click", function(event) {
  if (event.target.id !== undefined || event.target.id !== null || event.target.id !== "") {
    selectCategory(event.target);
  }
  return
});
document.querySelector(".activities__select-category").addEventListener('click', function(event) {
  var startBtn = event.target.className;
  console.log(startBtn);
  if (startBtn.includes("activities__timer__start-button__text")) {
    startTimer();
  }
});
document.querySelector("#minutes-seconds-block").addEventListener("keypress", function(event) {
  var validKeys = [8, 9, 13, 18, 92, 93];  //  keys like tab, etc
  if (event.keyCode >= 48 && event.keyCode <= 57 || validKeys.includes(event.keyCode) === true) {   // TODO future note in readme that this iterates 2x with each additional number
    event.currentTarget.addEventListener("keyup", function(event) {
      dataModelCollect(event.target);
    });
  } else {
    alert("ONLY NUMBERS");
    event.preventDefault();
  }
  // TODO function visual/text indicator
});
document.querySelector(".activities__start-button").addEventListener("click", function() {
  // TODO  make sure all fields are filled before starting timer
  if (descriptionCheck() !== false  && checkTime() !==false  && checkCategory() !== false) {
    console.log(checkTime());
    descriptionCheck();
    hideElements();
    insertTimer();
  }
});
// EVENT HANDLERS 👇
function selectCategory(category) {
  document.querySelector(`#${category.id}`).classList.add(`${category.id}-icon--active`);
  dataModelCollect(category);
  clearOtherCategories(category);
};
// target icon block with ${catagory.id}
function clearOtherCategories(category) {
  var allCategories = document.querySelectorAll(".activities__figure");
  for (var i = 0; i < allCategories.length; i++) {
    if (allCategories[i].id !== category.id) {
      allCategories[i].classList.remove(`${allCategories[i].id}-icon--active`)       // TODO remove class from p tag in activities__figure child node
    }
  }
};
function descriptionCheck() {
  var description = document.querySelector("#description-input");
  if (!description.value.trim().length === true) {
    document.querySelector(".activities__input-description__warning").classList.remove("--hidden");
    document.querySelector("#description-input").classList.add("activities__text-field--warning");
    return false
  } else {
    document.querySelector(".activities__input-description__warning").classList.add("--hidden");
    document.querySelector("#description-input").classList.remove("activities__text-field--warning");
    dataModelCollect(description)
  }
}
function checkTime() {
  if (dataModel.minutes !== "" || dataModel.seconds !== "") {
    return true
  } else {
    alert("placeholder: add times")
    return false
  }
}
function checkCategory() {
  if (dataModel.category !== "") {
    return true
  } else {
    alert("placeholder: pick category jackass")
    return false
  }
}
function dataModelCollect(element) {
  if (element.title === "category") {
    dataModel[element.title] = element.id
  } else {
    dataModel[element.title] = element.value;
  }
}
function hideElements() {
  document.querySelector(".activities__new-activity__h2").innerText = "Current Activity";
  document.querySelector(".activities__form").classList.add("--hidden");
}
function insertTimer() {
  document.querySelector(".activities__select-category").insertAdjacentHTML('afterbegin',
  `
  <div class="activities__timer">
    <div class="activities__timer__description">${dataModel.description}</div>
    <div class="activities__timer__clock">hello</div>
    <svg class="activities__timer__svg activities__timer__svg--pulse activities__timer--${dataModel.category}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="activities__timer__circle">
        <circle class="activities__timer__path-elapsed" cx="50" cy="50" r="45" />
        <path
        id="activities-timer-path-remaining"
        stroke-dasharray="283"
        class="
        activities__timer__path-remaining
        activities__timer__path-remaining--pulse
        activities__timer--${dataModel.category}
        "
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
        ></path>
      </g>
    </svg>
  <span class="activities__timer__start-button">
    <p
    class="
    activities__timer__start-button__text
    activities__timer__start-button__text--begin
    ">Ready?</p>
  </span>
  <button class="--hidden activities__timer__log-button">LOG ACTIVITY</button>
  </div>
  `
  );
  document.querySelector(".activities__select-category").classList.add("activities__select-category--apply-flex");
}
function startTimer() {
  var totalTime = Number(`${dataModel.minutes}` * 60) + Number(`${dataModel.seconds}`);
  document.querySelector(".activities__timer__start-button__text").innerText = ""
  countDown(totalTime);
}
function countDown(totalTime) {
  applyCountDownStyle("begin");
  var timeLeft = totalTime;
  setInterval(function() {
    minutes = parseInt(timeLeft / 60, 10);
    seconds = parseInt(timeLeft % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.querySelector(".activities__timer__clock").textContent = minutes + ":" + seconds;
    if (timeLeft-- <= 0) {
      timerComplete();
    }
    setCircleDasharray((timeLeft / totalTime));
  }, 1000);
}

function timerComplete() {
  dataModel.completed = true;
  document.querySelector(".activities__timer__start-button__text").textContent = "COMPLETE!";
  document.querySelector(".activities__timer__clock").textContent = "00:00";
  document.querySelector('.activities__timer__log-button').classList.remove("--hidden");
  document.querySelector('.activities__timer__start-button__text').classList.add(".activities__timer__start-button__text--nopointer");
  applyCountDownStyle("end");
}

// Update the dasharray value as time passes, starting with 283
function setCircleDasharray(timeFraction) {
  var circleDasharray = `${(timeFraction * 283).toFixed(0)} 283`; //  fraction of circle left
  document.querySelector(".activities__timer__path-remaining").setAttribute("stroke-dasharray", circleDasharray);  //  sets circle amount to above fraction, fires every second
}

// styling functions

function applyCountDownStyle(beginEnd) {
  var pathClass = document.querySelector("path").classList
  var svgClass = document.querySelector("svg").classList
  var startBtnTextClass = document.querySelector(".activities__timer__start-button__text").classList
  if (beginEnd === "begin") {
    startBtnTextClass.remove("activities__timer__start-button__text--begin");
    pathClass.remove("activities__timer__path-remaining--pulse");
    svgClass.remove("activities__timer__svg--pulse");
    svgClass.add("activities__timer__svg--active");
  } else if (beginEnd === "end") {
    svgClass.add("activities__timer__svg--pulse");
    svgClass.remove("activities__timer__svg--active");
  }
}
