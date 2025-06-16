const NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = NodeHelper.create({
  start: function() {
    console.log("MMM-Sundpaabudget helper started");
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "GET_MEAL_PLAN") {
      this.getMealPlan();
    }
  },

  getMealPlan: async function() {
    const { week, year } = getISOWeekYear(new Date());
    const url = `https://sundpaabudget.dk/sund-madplan-uge-${week}-${year}/`;
    try {
      const response = await fetch(url);
      const body = await response.text();
      const $ = cheerio.load(body);
      const content = $(".entry-content").html() || "Kunne ikke hente madplan.";
      this.sendSocketNotification("MEAL_PLAN", content);
    } catch (error) {
      console.error("MMM-Sundpaabudget: Failed to fetch", error);
      this.sendSocketNotification(
        "MEAL_PLAN",
        "Error fetching meal plan."
      );
    }
  }
});

function getISOWeekYear(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return { week: week, year: d.getUTCFullYear() };
}
