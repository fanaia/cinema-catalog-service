const config = {
  clearMocks: true,
  collectCoverage: true,
  maxWorkers: 1,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "logger.js"],
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  rootDir: ".",
  setupFiles: ["dotenv/config"],
  testEnvironment: "jest-environment-node",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "logger.js"],
};

module.exports = config;
