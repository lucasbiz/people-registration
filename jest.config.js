module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  transform: {
    "^.+\\.(ts|js|html|svg)$": "jest-preset-angular",
  },
  moduleFileExtensions: ["ts", "js", "html", "json"],
};
