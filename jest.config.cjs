module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"],
  collectCoverageFrom: ["src/**/*.js(x)?", "!src/index.js"],
  coverageReporters: ["html", "text-summary"],
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
