module.exports = function (w) {

  return {
    files: [
      'listing.1.1.ts'
    ],

    tests: [
      'listing.1.3.spec.ts'
    ],

    env: {
      type: 'node'
    },

    // or any other supported testing framework:
    // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
    testFramework: 'jasmine'
  };
};
