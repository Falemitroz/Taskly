// apiSwitcher.js
let api;

if (
  process.env.REACT_APP_USE_MOCK === "true" ||
  process.env.WEB_APP_USE_MOCK === "true"
) {
  api = require("./api.mock");
} else {
  api = require("./api");
}

module.exports = api;
