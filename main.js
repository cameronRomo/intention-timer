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
    console.log(event.keyCode);
    var number = KeyboardEvent.key.slice(-1);
    selectedTimeInput += number;
  } else {
    alert("ONLY NUMBERS");
    event.preventDefault();
  }
      // TODO visual/text indicator
});

document.querySelector(".activities__start-button").addEventListener('click', function() {
  goalCheck();  // for empty string
  // collect data from all fields
  // if min or sec empty = 0
  // TODO start timer
});

// EVENT HANDLERS 👇

function selectCategory(el) {
  el.classList.add(`${el.id}--active`);
  clearOtherCategories(el);
};

function clearOtherCategories(el) {
  var allCategories = document.querySelectorAll(".activities__figure");
  for (var i = 0; i < allCategories.length; i++) {
    if (allCategories[i].id !== el.id) {
      console.log(el);
      console.log(allCategories[i].id);

      allCategories[i].classList.remove(`${allCategories[i].id}--active`)       // TODO remove class from p tag in activities__figure child node
    }
  }
};

function goalCheck() {
  var goals = document.querySelector("#goals-input");
  if (!goals.value.trim().length === true) {
    alert("Why you do dat?!?! ¯\_( ͡° ͜ʖ ͡°)_/¯")
    //  display error "description required" + icon below field
    return
  } else {
    dataModelCollect("description")
  }
}

function dataModelCollect(data) {


  dataModel.description = goal
}
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
