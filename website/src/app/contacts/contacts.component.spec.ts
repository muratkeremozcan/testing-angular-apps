// ISOLATED TEST Listing 3.1 3.2
// these type of tests are ISOLATED TESTS because they do not need any Angular dependencies;
  // they can be treated like ordinary Typescript files

import { ContactsComponent } from './contacts.component';
import { Contact } from './shared/models/contact.model';


describe('ContactsComponent tests', () => {
  let contactsComponent: ContactsComponent = null; // = null is optional

  beforeEach(() => {
    contactsComponent = new ContactsComponent(); // instantiate
  });

  it('should set instance correctly', () => {
    // assert that the component is set correctly (by the constructor)
      // will pass if the value is not null
    expect(contactsComponent).toBeTruthy();
  });

  it('should be no contacts if there is no data', () => {
    expect(contactsComponent.contacts.length).toBe(0);
  });

  it('should be contacts if there is data', () => {
    const newContact: Contact = {
      id: 1,
      name: 'Jason Pipemaker'
    };
    const contactList: Array<Contact> = [newContact];
    contactsComponent.contacts = contactList;
    // assert that if a contact is added, then there should be 1 contact in the array
    expect(contactsComponent.contacts.length).toBe(1);
  });
});
