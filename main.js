// GLOBAL VARIABLES 👇

var dataModel = {
  category: "",
  description: "",
  minutes: "",
  seconds: "",
  completed: false,
  id: "",
};

// EVENT LISTENERS 👇

document.querySelector(".activities__icons-section").addEventListener('click', function(event) {
  if (event.currentTarget.id !== undefined) {  // to avoid calling fxn w/click empty space (currentTarget or target?)
    selectCategory(event.target);
  }
});

document.querySelector("#minutes-seconds-block").addEventListener('keydown', function(event) {
  var validChars = [8,9,13,18,92,92,93];  //  keys like tab, etc
  var selectedTimeInput = event.target.value;
  if (event.keyCode >= 48 && event.keyCode <= 57 || validChars.includes(event.keyCode) === true) {
    var number = KeyboardEvent.key.slice(-1);
    selectedTimeInput += number;
    if (event.target.title === minutes) {
      dataModelCollect(minutes)
    } else {
      dataModelCollect(seconds)
    }
  } else {
    alert("ONLY NUMBERS");
    event.preventDefault();
  }
      // TODO function visual/text indicator
});

document.querySelector(".activities__start-button").addEventListener('click', function() {
  descriptionCheck();
  // for empty string
  // collect data from all fields
  // if min or sec empty = 0
  // TODO start timer
});

// EVENT HANDLERS 👇

function selectCategory(category) {
  category.classList.add(`${category.id}--active`);
  dataModelCollect(category);
  clearOtherCategories(category);
};

function clearOtherCategories(category) {
  var allCategories = document.querySelectorAll(".activities__figure");
  for (var i = 0; i < allCategories.length; i++) {
    if (allCategories[i].id !== category.id) {
      allCategories[i].classList.remove(`${allCategories[i].id}--active`)       // TODO remove class from p tag in activities__figure child node
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

function dataModelCollect(data) {
  if (data.title === "category") {
    dataModel[data.title] = data.id
    console.log(dataModel[data.title]);
    console.log(data.id);
  } else {
    dataModel[data.title] = data.value;
  }
}

// } else if (data.title === "minutes" || "seconds") {


//
// category: "",
// description: "",
// minutes: "",
// seconds: "",
// completed: false,
// id:

//
// timer ends
// instantiate class object
// clear fields
