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
  if (event.target.id !== undefined || null || "") {
    selectCategory(event.target);
  }
});

document.querySelector("#minutes-seconds-block").addEventListener('keypress', function(event) {
  var validChars = [8,9,13,18,92,92,93];  //  keys like tab, etc
  if (event.keyCode >= 48 && event.keyCode <= 57 || validChars.includes(event.keyCode) === true) {
    console.log(event.target.value);
    event.currentTarget.addEventListener('keyup', function(event) {
      minuteSecondCheck(event);
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
  // category.classList.add(`${category.id}-icon--active`);
  document.querySelector(`#${category.id}`).classList.add(`${category.id}-icon--active`);
  console.log(category.id);
  dataModelCollect(category);
  clearOtherCategories(category);
};

// target icon block with ${ctagory.id}

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

function dataModelCollect(data) {
  console.log(data.title);
  if (data.title === "category") {
    console.log(dataModel[data.title]);
    console.log(data.id);
    dataModel[data.title] = data.id
  } else {
    console.log(data.value);
    dataModel[data.title] = data.value;
  }
}

function minuteSecondCheck(element) {
  var timeInputField = element.target
  if (timeInputField.title === "minutes") {
    console.log(timeInputField.title, "minutes");
    dataModelCollect(timeInputField);
  } else {
    console.log(timeInputField.title, "seconds");
    dataModelCollect(timeInputField);
  }
}

// timer ends
// instantiate class object
// clear fields
