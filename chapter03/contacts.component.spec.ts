// listing 3.1
import { ContactsComponent } from './contacts.component';
import { Contact } from '../shared/models/contact.model';

describe('ContactsComponent Tests', () => {
  let contactsComponent: ContactsComponent; // or = null

  beforeEach(() => {
    contactsComponent = new ContactsComponent(); // instantiate before each test
  });

  it('should set instance correctly', () => {
    contactsComponent; //?
    expect(contactsComponent).toBeTruthy();
  });

  it('should be no contacts if there is no data', () => {
    expect(contactsComponent.contacts.length).toBe(0); // contacts array is empty by default
  });

  it('should be contacts if there is data', () => {
    const newContact: Contact = { // create a contact of type Contact
      id: 1,
      name: 'Jason Pipemaker'
    };
    
    const contactsList: Array<Contact> = [newContact]; // create an array of type Contact, with 1 element newContact
    contactsList; //?
    contactsComponent.contacts = contactsList // set the class' contacts property as that array

    expect(contactsComponent.contacts.length).toBe(1); // assert that there is 1 array there

  });
});

