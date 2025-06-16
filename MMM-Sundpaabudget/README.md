# MMM-Sundpaabudget

This MagicMirror² module displays the weekly meal plan from **Sund på Budget**.
The module automatically updates the URL based on the current ISO week number
and year.

## Installation

1. Clone this repository into your `modules` folder of MagicMirror²:
   ```bash
   git clone <repo-url> MMM-Sundpaabudget
   ```
2. Install dependencies:
   ```bash
   cd MMM-Sundpaabudget
   npm install
   ```
3. Add the module to the `config.js` of your MagicMirror setup:
   ```javascript
   {
     module: "MMM-Sundpaabudget",
     position: "top_left",
   }
   ```

The module fetches the meal plan once every twelve hours and displays the
content from `https://sundpaabudget.dk`.
