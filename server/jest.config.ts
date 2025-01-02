import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}]
  },
  preset: "@shelf/jest-mongodb"
};

export default config;
