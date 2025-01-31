module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)"
    ]
  };
  