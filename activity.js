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

  }

  markComplete() {

  }

  saveToStorage() {

  }
};
