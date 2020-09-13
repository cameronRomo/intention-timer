// GLOBAL VARIABLES 👇

var dataModel = {
  category: "",
  description: "",
  minutes: "",
  seconds: "",
  completed: false,
  id: "",
};

var newCard = new Activity(dataModel)
// EVENT LISTENERS 👇

document.querySelector(".activities__icons-section").addEventListener('click', function(event) {
  if (event.target.id !== undefined || event.target.id !== null || event.target.id !== "") {
    selectCategory(event.target);
  }
  return
});

document.querySelector("#minutes-seconds-block").addEventListener('keypress', function(event) {
  // console.log(event);
  // console.log(event.keyCode);
  // console.log(event.target.value);

  var validKeys = [8, 9, 13, 18, 92, 93];  //  keys like tab, etc
  if (event.keyCode >= 48 && event.keyCode <= 57 || validKeys.includes(event.keyCode) === true) {   // TODO future note in readme that this iterates 2x with each additional number
    event.currentTarget.addEventListener('keyup', function(event) {
      dataModelCollect(event.target);
    });
  } else {
    alert("ONLY NUMBERS");
    event.preventDefault();
  }
  // TODO function visual/text indicator
});

document.querySelector(".activities__start-button").addEventListener('click', function() {
  descriptionCheck();
  // TODO start timer
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
    var timer = 90;    // total time from data model minutes*60 + seconds
    var minutes;
    var seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10); // regex for numerical system
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.querySelector('#time').textContent = minutes + ":" + seconds;
        if (--timer < 0) {
          timer = totalTime;
        }
    }, 1000); // Fire function after 1000 miliseconds
}

// timer ends
// instantiate class object
// clear fields
