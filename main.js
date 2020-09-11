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
  if (event.currentTarget.id !== undefined) {      // // TODO currentTarget or target?
  selectCategory(event.target);
  }
  dataModel.category = ""  // add .value to object model
});

document.querySelector(".activities__start-button").addEventListener('click', function() {
  errorCheck();
  // check all inputs have values
  // function check make sure min/sec are numbers
  // submit to data model
  // start timer
});

// document.querySelector("#minutes-input").addEventListener()
//
// document.querySelector("#seconds-input").addEventListener()

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

// function errorCheck() {
//   var allFields = document.querySelectorAll(".activities__text-field");
//   var goals = document.querySelector("#goals-input").value;
//   var minutes = document.querySelector("#minutes-input").value;
//   var seconds = document.querySelector("#seconds-input").value;
//   //check all fields have a values
//   //check values are legit
//   if (!goals.trim().length === true) {
//     alert("Why you do dat?!?! ¯\_( ͡° ͜ʖ ͡°)_/¯")
//     //  display error "description required" + icon below field
//     return
//   }
//   // make sure numbers are numbers
//   if (isNaN(minutes) === true || (isNaN(seconds) === true)) {
//     e.preventDefault();
//     alert("your numbers fkt")
//   }
//
//   // if (sec OR min
// }


document.querySelector("#seconds-input, #minutes-input").addEventListener("keydown", function(event) {
  var goals = document.querySelector("#goals-input");
  var minutes = document.querySelector("#minutes-input");
  var seconds = document.querySelector("#seconds-input");
  var invalidChars = e
  //   "-",
  //   "+",
  //   "e",
  // ];
  // if (!goals.trim().length === true) {
  //   alert("Why you do dat?!?! ¯\_( ͡° ͜ʖ ͡°)_/¯")
  //   //  display error "description required" + icon below field
  //   return
  // } else {
    //  push goal into datamodel
  }
  if (event.key.includes(invalidChars)) {
    event.preventDefault();
    alert("no letters sorry")
  }
});
