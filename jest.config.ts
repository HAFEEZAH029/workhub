import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // SWC rewrites `@/...` aliases to real paths for actual import/require
  // statements at compile time, but it doesn't touch string literals passed
  // to function calls like jest.mock("@/..."). This makes Jest's own
  // resolver aware of the same alias so jest.mock() calls work too.
  // Adjust "<rootDir>/src/$1" to match your tsconfig.json's `paths` entry
  // if your alias points somewhere other than ./src.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
