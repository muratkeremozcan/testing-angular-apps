// listing 6.13

import { TestBed } from '@angular/core/testing';
// HttpClientTestingModule removes the need for manually blocking calls from HttpClient trying to reach a server
  // HttpTestingController lets you interact with its testing module to verify that calls are being attempted and to supply canned responses
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contact.service';

// for tests involving HttpClient the asynchronous observable behavior is simulated without you having to add anything to your tests

describe('ContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ContactService ]
    });
  });

  describe('getContacts', () => {

    let contactService: ContactService;
    let httpTestingController: HttpTestingController;
    let mockContact: any;

    beforeEach(() => {
      contactService = TestBed.get(ContactService);
      httpTestingController = TestBed.get(HttpTestingController);
      mockContact = { id: 100, name: 'Erin Dee', email: 'edee@example.com' };
    });

    it('should GET a list of contacts', () => {
      // with OBSERVABLES instead of then, you use subscribe. Observable callbacks are called whenever new values are emitted from an observable
        // on the other hand, promises are only resolved once
      contactService.getContacts().subscribe((contacts) => {
        expect(contacts[0]).toEqual(mockContact);
      });

      const request = httpTestingController.expectOne('app/contacts');

      request.flush([mockContact]);

      httpTestingController.verify();
    });
  });
});
