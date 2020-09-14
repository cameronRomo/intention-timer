// GLOBAL VARIABLES 👇

var dataModel = {
  category: "",
  description: "",
  minutes: "",
  seconds: "",
  completed: false,
  id: "",
}

var newCard = new Activity(dataModel)
// EVENT LISTENERS 👇

document.querySelector(".activities__icons-section").addEventListener("click", function(event) {
  if (event.target.id !== undefined || event.target.id !== null || event.target.id !== "") {
    selectCategory(event.target);
  }
  return
});

document.querySelector("#minutes-seconds-block").addEventListener("keypress", function(event) {
  // console.log(event);
  // console.log(event.keyCode);
  // console.log(event.target.value);

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
  descriptionCheck();
  hideElements();
  startTimer();
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
    alert("Need a description ¯\_( ͡° ͜ʖ ͡°)_/¯")
    //  display error "description required" + icon below field
    return
  } else {
    dataModelCollect(description)
  }
}

function dataModelCollect(element) {
  if (element.title === "category") {
    dataModel[element.title] = element.id
  } else {
    dataModel[element.title] = element.value;
  }
}

function startTimer() {
  var totalTime = Number(`${dataModel.minutes}` * 60) + Number(`${dataModel.seconds}`);
  console.log(totalTime);
  var minutes;
  var seconds;
  document.querySelector(".activities__select-category").insertAdjacentHTML("afterbegin", //TODO: break this out into seperate function for SRP
    `
    <div class="activities__timer--${dataModel.category}">
      <div class="activities__timer__description">${dataModel.description}</div>
      <div class="activities__timer__clock"></div>
      <button class="activities__timer__button">START</button>
    </div>
    `
  );

  setInterval(function () {
    minutes = parseInt(totalTime / 60, 10);
    seconds = parseInt(totalTime % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.querySelector(".activities__timer").textContent = minutes + ":" + seconds;

    if (--totalTime <= 0) {
      // totalTime = 0;
      document.querySelector(".activities__timer").textContent = "Time's Up!!!"
    }
  }, 1000);  // speed of countdown
}

function hideElements() {
  document.querySelector(".activities__new-activity__h2").innerText = "Current Activity";
  document.querySelector(".activities__form").classList.add("--hidden");
}

function insertTimer() {
  document.querySelector(".activities__select-category").insertAdjacentHTML('afterbegin',
  `
  <div class="activities__timer activities__timer--${dataModel.category}">
    <div class="activities__timer__description">${dataModel.description}</div>
    <div class="activities__timer__clock">${dataModel.startTimePlaceholder}</div>
    <svg class="activities__timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="activities__timer__circle">
        <circle class="activities__timer__path-elapsed" cx="50" cy="50" r="45" />
        <path
        id="activities-timer-path-remaining"
        stroke-dasharray="283"
        class="activities__timer__path-remaining activities__timer--${dataModel.category}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
        ></path>
      </g>
    </svg>
    <span class="activities__timer__button">
      <p class="activities__timer__button__text">START</p>
    </span>
  </div>
  `
  );
  document.querySelector(".activities__select-category").classList.add("activities__select-category--apply-flex");
  startTimer();
}

function startTimer() {
  var totalTime = Number(`${dataModel.minutes}` * 60) + Number(`${dataModel.seconds}`);
  var minutes;
  var seconds;
  var timeLeft = totalTime;
  dataModel.startTimePlaceholder = minutes + ":" + seconds;
  setInterval(function () {
    minutes = parseInt(timeLeft / 60, 10);
    seconds = parseInt(timeLeft % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.querySelector(".activities__timer__clock").textContent = minutes + ":" + seconds;
    if (timeLeft-- <= 0) {
      document.querySelector(".activities__timer__clock").textContent = "Time's Up!!!"
      // TODO complete activity = true
      // TODO Completion message
    }
    setCircleDasharray((timeLeft / totalTime));
  }, 1000);
}

// timer ends
// instantiate class object
// clear fields
