import { DebugElement } from '@angular/core'; // to inspect an element during testing
// to create fixture, ensure all async tasks are complete before assertions, to setup and config tests, simulate time
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser'; // to select DOM elements
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // to mock animations
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'; // bootstrap the browser for testing
import { RouterTestingModule } from '@angular/router/testing'; // to setup routing for testing

import { FormsModule } from '@angular/forms'; // ContactEditComponent uses it for form controls

import { Contact, ContactService, FavoriteIconDirective, InvalidEmailModalComponent, InvalidPhoneNumberModalComponent } from './shared';
import { AppMaterialModule } from '../../app.material.module';
import { ContactEditComponent } from './contact-edit.component';

import '../../../material-app-theme.scss';

describe('ContactEditComponent tests', () => {
  let fixture: ComponentFixture<ContactEditComponent>; // stores an instance of the ComponentFixture, contains method that help debug and test a component
  let component: ContactEditComponent; // stores an instance of the ContactEditComponent
  let rootElement: DebugElement; // stores the DebugElement for the component, which is how we access its children

  // mock: simulates the real object, keeps track of when the object is called and the arguments it receives
  // stub: simpler fake of the real object, no logic, always returns the same value

  // Mock contactService
  const contactServiceStub = {
    contact: { // default contact object
      id: 1,
      name: 'janet'
    },

    save: async function (contact: Contact) { // sets the passed-in object to the component's contact property
      component.contact = contact;
    },

    getContact: async function () { // method that sets the current contact as the component's contact property and returns that contact
      component.contact = this.contact;
      return this.contact;
    },

    updateContact: async function (contact: Contact) { // method that updates the contact object
      component.contact = contact;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactEditComponent, FavoriteIconDirective, InvalidEmailModalComponent, InvalidEmailModalComponent],
      imports: [AppMaterialModule, FormsModule, NoopAnimationsModule, RouterTestingModule],
      providers: [{ provide: ContactService, useValue: contactServiceStub }] //this is where contactServiceStub is used instead of the real service
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, { // configure the test bed to be used in the tests
      set: { // overrideModule is used to lazy load some components
        entryComponents: [InvalidEmailModalComponent,
          InvalidPhoneNumberModalComponent]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  describe('saveContact() test', () => {
    it('should display contactname after contact set', fakeAsync(() => {
      const contact = {
        id: 1,
        name: 'lorace'
      };

      component.isLoading = false; // sets isLoading false to hide progress bar

      component.saveContact(contact); // save the contact object

      fixture.detectChanges(); // use the detectChanges method to trigger change detection

      const nameInput = rootElement.query(By.css('.contact-name')); // gets the nameInput form field

      tick(); // simulate the passage of time
      
      expect(nameInput.nativeElement.value).toBe('lorace'); // check to see if the name property has been set correctly

    }));
  });

  describe('loadContact() test', () => {
    it('should load contact', fakeAsync(() => {
      component.isLoading = false;
      component.loadContact();
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('janet'); // the default contact loaded has this value
    }));
  });

  describe('updateContact() tests', () => {
    it('should update the contact', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'delia',
        email: 'delia@example.com',
        number: '1234567890'
      };
  
      component.contact = {
        id: 2,
        name: 'rhonda',
        email: 'rhonda@example.com',
        number: '1234567890'
      };
  
      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('rhonda');
  
      component.updateContact(newContact); // updates the existing contact to the newContact object
      fixture.detectChanges(); // trigger change detection
      tick(100); // pass time
      expect(nameInput.nativeElement.value).toBe('delia'); // check that the value in the nameInput form field has een changed
    }));

    it('should not update the contact if email is invalid', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'london',
        email: 'london@example',
        number: '1234567890'
      };
    
      component.contact = {
        id: 2,
        name: 'chauncey',
        email: 'chauncey@example.com',
        number: '1234567890'
      };
    
      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('chauncey');
    
      component.updateContact(newContact);
      fixture.detectChanges();
      tick(100);
      expect(nameInput.nativeElement.value).toBe('chauncey');
    }));

    it('should not update the contact if phone number is invalid', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'london',
        email: 'london@example.com',
        number: '12345678901'
      };
    
      component.contact = {
        id: 2,
        name: 'chauncey',
        email: 'chauncey@example.com',
        number: '1234567890'
      };
    
      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('chauncey');
    
      component.updateContact(newContact);
      fixture.detectChanges();
      tick(100);
      expect(nameInput.nativeElement.value).toBe('chauncey');
    }));
    
  });
  
});
