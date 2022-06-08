const { include: collectCoverageFrom } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom
};
