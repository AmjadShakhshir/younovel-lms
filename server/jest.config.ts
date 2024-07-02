// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  globalSetup: "<rootDir>/jest.setup.ts",
  globalTeardown: "<rootDir>/jest.teardown.ts",
  verbose: true,
  transformIgnorePatterns: ["/node_modules/"],
};
export default config;
