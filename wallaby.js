module.exports = function (w) {

  return {
    files: [
      './**/listing1.1.src.ts',
      './**/contact.ts',
      './**/contacts.component.ts',
      './chapter03/app/contacts/contact-edit/contact-edit.component.spec.ts'

    ],

    tests: [
      './**/listing1.3.spec.ts',
      './**/listing2.3.spec.ts',
      './**/contacts.component.spec.ts',
      './chapter03/app/contacts/contact-edit/contact-edit.component.ts'
    ],

    env: {
      type: 'node'
    },

    testFramework: 'jasmine'
  };
};
