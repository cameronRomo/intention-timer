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
    applyCountDownStyle("begin");
    countDown(totalTime);
  }

  markComplete() {
    this.completed = true;
    document.querySelector(".activities__timer__start-button__text").textContent = "COMPLETE!";
    document.querySelector(".activities__timer__clock").textContent = "00:00";
    document.querySelector('.activities__timer__log-button').classList.remove("--hidden");
    document.querySelector('.activities__timer__start-button__text').classList.add(".--nopointer");
    applyCountDownStyle("end");
  }

  saveToStorage() {
    pastActivityData.push(newActivity);
    var stringifiedActivity = JSON.stringify(pastActivityData);
    localStorage.setItem('savedActivities', stringifiedActivity);
      // TODO return to main form  - opposite of hideElements
  }
};
