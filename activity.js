class Activity {
  constructor(dataModel) {
    this.category = dataModel.category;
    this.description = dataModel.description;
    this.minutes = dataModel.minutes;
    this.seconds = dataModel.seconds;
    this.completed = false;
    this.id = Date.now();
  }

  beginTimer() {
    var totalTime = Number(`${pastActivityData[0].minutes}` * 60) + Number(`${pastActivityData[0].seconds}`);
    document.querySelector(".activities__timer__start-button__text").innerText = ""
    countDown(totalTime);
  }

  markComplete() {

  }

  saveToStorage() {

  }
};
