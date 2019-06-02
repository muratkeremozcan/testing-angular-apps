// listing 6.11
// import asynchronous testing methods
import { TestBed, fakeAsync, flushMicrotasks, inject } from '@angular/core/testing';

import { BrowserStorageAsync } from "./browser-storage.service";
import { PreferencesAsyncService } from './preferences-async.service';

// when testing async services, the mocks for these services also have to be asynchronous
class BrowserStorageAsyncMock {
  getItem = (property: string) => Promise.resolve({ key: 'testProp', value: 'testValue' });
  setItem = ({ key: key, value: value }) => Promise.resolve(true);
}

describe('PreferencesAsyncService', () => {
  // TestBed is configured with PreferencesAysncService before every test
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesAsyncService, {
        provide: BrowserStorageAsync, useClass: BrowserStorageAsyncMock
      }]
    });
  });


  it('should get a value', fakeAsync(inject([PreferencesAsyncService, BrowserStorageAsync],
    (service: PreferencesAsyncService, browserStorage: BrowserStorageAsyncMock) => {

      // add a spy to browserStorage.getItem
      spyOn(browserStorage, 'getItem').and.callThrough();

      let results, error;

      service.getPropertyAsync('testProp')
        .then(val => results = val)
        .catch(err => error = err);

      flushMicrotasks(); // processes the promise microtasks

      expect(results.key).toEqual('testProp');
      expect(results.value).toEqual('testValue');
      expect(browserStorage.getItem).toHaveBeenCalledWith('testProp');
      expect(error).toBeUndefined(); // ensures error value wasn't assigned
    }))
  );

  it('should throw an error if the key is missing', fakeAsync(inject([PreferencesAsyncService],
    (service: PreferencesAsyncService) => {

      let result, error;
      service.getPropertyAsync('') // call getPropertyAsync with an invalid value
        .then(value => result = value) // uses the BrowserStorageAsyncMock default return value
        .catch((err) => error = err); // catches the expected error ans assigns it locally
      // when something goes wrong calling a promise, the catch methods handles the error

      flushMicrotasks();
      expect(result).toBeUndefined();
      expect(error).toEqual('getPropertyAsync requires a property name');

    }))
  );

});
