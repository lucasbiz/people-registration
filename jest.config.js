module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: {
    "^@services/(.*)$": "<rootDir>/src/app/services/$1",
    "^@components/(.*)$": "<rootDir>/src/app/components/$1",
  },
};
