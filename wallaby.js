module.exports = function (w) {

  return {
    files: [
      './**/*src.ts'
    ],

    tests: [
      './**/*spec.ts'
    ],

    env: {
      type: 'node'
    },

    testFramework: 'jasmine'
  };
};
