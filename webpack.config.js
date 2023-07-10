const path = require("path");

module.exports = {
  // ... other webpack configuration options

  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};
