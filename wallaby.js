module.exports = function (w) {

  return {
    files: [
      './**/listing1.1.src.ts',
      './**/contact.ts',
      './**/contacts.component.ts',
      './website/src/app/contacts/contact-edit/contact-edit.component.spec.ts',
      './website/src/app/contacts/shared/favorite-icon/favorite-icon.directive.ts'

    ],

    tests: [
      './**/listing1.3.spec.ts',
      './**/listing2.3.spec.ts',
      './**/contacts.component.spec.ts',
      './website/src/app/contacts/contact-edit/contact-edit.component.ts',
      './website/src/app/contacts/shared/favorite-icon/favorite-icon.directive.spec.ts'
    ],

    env: {
      type: 'node'
    },

    testFramework: 'jasmine'
  };
};
