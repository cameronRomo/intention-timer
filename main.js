// On page load
document.onload = displayStoredCards();

// GLOBAL VARIABLES 👇
var newActivity;
var pastActivityData = [
  {
  category: "",
  description: "",
  minutes: "",
  seconds: "",
  completed: false,
  id: "",
  }
];

// EVENT LISTENERS 👇

// Log Activity (Local storage and new card)
document.querySelector(".activities__new-activity").addEventListener("click", function(event) {
  if (event.target.className === "activities__timer__log-button") {
    newActivity.saveToStorage();
    // newActivity.completed = false;
    showForm();
    clearInputs();
    displayCard();
  }
});

// Category selection
document.querySelector(".activities__icons-section").addEventListener("click", function(event) {
  if (event.target.id !== undefined || event.target.id !== null || event.target.id !== "") {
    selectCategory(event.target);
  }
  return
});

// Number input validation
document.querySelector("#minutes-seconds-block").addEventListener("keypress", function(event) {
  var validKeys = [8, 9, 13, 18, 92, 93];  //  keys like tab, etc
  if (event.keyCode >= 48 && event.keyCode <= 57 || validKeys.includes(event.keyCode) === true) {   // TODO future note in readme that this iterates 2x with each additional number
    event.currentTarget.addEventListener("keyup", function(event) {
      dataModelCollect(event.target);
    });
  } else {
    alert("Numbers Only");
    event.preventDefault();
  }
});

// Prepare timer (Start activity)
document.querySelector(".activities__start-button").addEventListener("click", function(event) {
  if (descriptionCheck() !== false  && checkTime() !==false  && checkCategory() !== false) {
    descriptionCheck();
    newActivity = new Activity(pastActivityData[0]);
    newActivity.completed = false;
    hideForm();
    insertTimer();
  }
});

// Start timer
document.querySelector(".activities__select-category").addEventListener('click', function(event) {
  var startBtn = event.target.className;
  if (startBtn.includes("activities__timer__start-button__text") && pastActivityData[0].completed === false) {
    newActivity.beginTimer();
    playSound("meditate");
    document.querySelector('.activities__timer__description').classList.remove('--opacity50');
  } else {
    event.preventDefault
  }
});

// EVENT HANDLERS 👇

function playSound(category) {
  gong = new Audio("./assets/gong.mp3");
  thunder = new Audio("./assets/thunder.mp3");
  gong.pause();
  thunder.pause();
  if (category === "meditate") {
    gong.volume = .05;
    thunder.volume = .075;
    gong.play();
    thunder.play();
    thunder.loop = true;
  }
}

function selectCategory(category) {
  document.querySelector(`#${category.id}`).classList.add(`${category.id}-icon--active`);
  dataModelCollect(category);
  clearOtherCategories(category);
};

function clearOtherCategories(category) {
  var allCategories = document.querySelectorAll(".activities__figure");
  for (var i = 0; i < allCategories.length; i++) {
    if (allCategories[i].id !== category.id) {
      allCategories[i].classList.remove(`${allCategories[i].id}-icon--active`)       // TODO remove class from p tag in activities__figure child node
    }
  }
};

function clearInputs() {
  document.querySelector(`#${pastActivityData[0].category}`).classList.remove(`${pastActivityData[0].category}-icon--active`);
  document.querySelector("#description-input").value = "";
  document.querySelector("#minutes-input").value = "";
  document.querySelector("#seconds-input").value = "";
  pastActivityData[0].minutes = ""; // ugly bug fix
  pastActivityData[0].seconds = ""; // ugly bug fix
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
  if (pastActivityData[0].minutes !== "" || pastActivityData[0].seconds !== "") {
    return true
  } else {
    alert("Please add minutes or seconds")
    return false
  }
}

function checkCategory() {
  if (pastActivityData[0].category !== "") {
    return true
  } else {
    alert("Please choose a category")
    return false
  }
}

function dataModelCollect(element) {
  if (element.title === "category") {
    pastActivityData[0][element.title] = element.id
  } else {
    pastActivityData[0][element.title] = element.value;
  }
}

function hideForm() {
  document.querySelector(".activities__new-activity__h2").innerText = "Current Activity";
  document.querySelector(".activities__form").classList.add("--hidden");
}

function showForm() {
  document.querySelector(".activities__form").classList.remove("--hidden");
  document.querySelector(".activities__timer").classList.add("--hidden");
}

function insertTimer() {
  document.querySelector(".activities__select-category").insertAdjacentHTML('afterbegin',
  `
  <div class="activities__timer">
    <div class="activities__timer__description --opacity50">${pastActivityData[0].description}</div>
    <div class="activities__timer__clock">You got this.</div>
    <svg class="activities__timer__svg activities__timer__svg--pulse activities__timer--${pastActivityData[0].category}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="activities__timer__circle">
        <circle class="activities__timer__path-elapsed" cx="50" cy="50" r="45" />
        <path
        id="activities-timer-path-remaining"
        stroke-dasharray="283"
        class="
        activities__timer__path-remaining
        activities__timer__path-remaining--pulse
        activities__timer--${pastActivityData[0].category}
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

function countDown(totalTime) {
  var timeLeft = totalTime;
  setInterval(function() {
    minutes = parseInt(timeLeft / 60, 10);
    seconds = parseInt(timeLeft % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.querySelector(".activities__timer__clock").textContent = minutes + ":" + seconds;
    if (timeLeft-- <= 0) {
      newActivity.markComplete();
      document.querySelector(".activities__timer__clock").textContent = "Nicely done!";
    }
    setCircleDasharray((timeLeft / totalTime));
  }, 1000);
}

function displayCard() {
  document.querySelector(".activities__past-activity__h2").insertAdjacentHTML('afterend',
    `
    <div class="card__wrapper">
      <div class="card__data">
        <h5 class="card__data-1">${pastActivityData[pastActivityData.length-1].category}</h5>
        <h5 class="card__data-2">${pastActivityData[pastActivityData.length-1].minutes} MIN</h5>
        <h5 class="card__data-3">${pastActivityData[pastActivityData.length-1].description}</h5>
      </div>
      <div class="card__category-color__container">
        <div class="card__category-color__bar card__category-color__bar--${pastActivityData[pastActivityData.length-1].category}"></div>
      </div>
    </div>
    `
  )
}

function displayStoredCards() {
  var retrievedAct = localStorage.getItem("savedActivities");
  if (retrievedAct !== null) {
    var parsedAct = JSON.parse(retrievedAct);
    if (parsedAct !== [] || parsedAct !== null) {
      pastActivityData = parsedAct;
      for (var i = 0; i < pastActivityData.length; i++) {
        if (pastActivityData[i].completed !== false) {
          displayCard();
        }
      }
    }
  }
}

// styling functions

function setCircleDasharray(timeFraction) {
  var circleDasharray = `${(timeFraction * 283).toFixed(0)} 283`; //  fraction of circle left
  document.querySelector(".activities__timer__path-remaining").setAttribute("stroke-dasharray", circleDasharray);  //  sets circle amount to above fraction, fires every second
}

function applyCountDownStyle(beginEnd) {
  var pathClass = document.querySelector("path").classList
  var svgClass = document.querySelector("svg").classList
  var startBtnTextClass = document.querySelector(".activities__timer__start-button__text").classList
  if (beginEnd === "begin") {
    startBtnTextClass.remove("activities__timer__start-button__text--begin");
    pathClass.remove("activities__timer__path-remaining--pulse");
    svgClass.remove("activities__timer__svg--pulse");
    svgClass.add("activities__timer__svg--active");
    svgClass.add("activities__timer__svg--animate");
  } else if (beginEnd === "end") {
    startBtnTextClass.add("activities__timer__start-button__text--end");
    svgClass.add("activities__timer__svg--pulse-complete");
    svgClass.remove("activities__timer__svg--active");
    svgClass.remove("activities__timer__svg--animate");
  }
}
