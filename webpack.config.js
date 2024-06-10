const path = require("path");

module.exports = {
  entry: "./js/game.js", // Change this to your main JS file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production", // or 'development' for development mode
};
