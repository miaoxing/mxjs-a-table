module.exports = {
  transform: {
    //'^.+\\.ts?$': 'ts-jest',
    "^.+\\.jsx?$": "babel-jest"
  },
  testEnvironment: 'jsdom',
  testTimeout: 10000,
  // Allow /node_modules/ for CI testing
  "transformIgnorePatterns": [],
  // Fix TypeError: Unable to require `.d.ts` file.
  // https://github.com/kulshekhar/ts-jest/issues/950
  globals: {
    'ts-jest': {
      isolatedModules: true
    },
  },
  "moduleNameMapper": {
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
  }
};
