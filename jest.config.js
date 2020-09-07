module.exports = {
  bail: true,
  testMatch: ['**/__tests__/**/(*.)+test.[jt]s?(x)'],
  setupFilesAfterEnv: ['jest-extended', '<rootDir>__tests__/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|scss|css)$':
      '<rootDir>/__tests__/fileMock.ts',
    'ContainersProvider\\.tsx$': '<rootDir>/__tests__/fileMock.ts',
  },
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/__fixtures__', '/__tests__/helpers', '/dist/'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['**/src/**/*.{ts,tsx}', '!**/loader.{ts,tsx}', '!**/node_modules/**'],
  coveragePathIgnorePatterns: ['.*\\.d\\.ts'],
};
