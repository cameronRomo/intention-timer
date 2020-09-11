var dataModel = {
  category: "",
  description: "",
  minutes: "",
  seconds: "",
  completed: false,
  id: "",
};

// TODO remove class from p tag in activities__figure
// TODO currentTarget or target?

document.querySelector(".activities__icons-section").addEventListener('click', function(event) {
  if (event.currentTarget.id !== undefined) {
  selectCategory(event.target);
  }
  dataModel.category = ""  // add .value to object model
});

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
      allCategories[i].classList.remove(`${allCategories[i].id}--active`)
    }
  }
};
