module.exports = function (w) {

  return {
    files: [
      './**/listing1.1.src.ts'
    ],

    tests: [
      './**/listing1.3.spec.ts'
    ],

    env: {
      type: 'node'
    },

    testFramework: 'jasmine'
  };
};
