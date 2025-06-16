Module.register("MMM-Sundpaabudget", {
  defaults: {
    updateInterval: 12 * 60 * 60 * 1000 // 12 hours
  },

  start: function() {
    this.mealPlan = null;
    this.loadData();
    var self = this;
    setInterval(function() {
      self.loadData();
    }, this.config.updateInterval);
  },

  loadData: function() {
    this.sendSocketNotification("GET_MEAL_PLAN");
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "MEAL_PLAN") {
      this.mealPlan = payload;
      this.updateDom();
    }
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    if (!this.mealPlan) {
      wrapper.innerHTML = "Loading meal plan...";
    } else {
      wrapper.innerHTML = this.mealPlan;
    }
    return wrapper;
  }
});
