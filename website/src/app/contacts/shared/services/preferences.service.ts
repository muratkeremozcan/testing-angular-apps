// Listing 6.1
/* SERVICES
Services are the part of your application that do not generally interact with the UI.
  They allow you to write non-UI code that's modular, reusable and testable
Angular services implement the @Injectable class decorator, which adds metadata that Angular uses for resolving dependencies
Angular uses the class itself to create a provider token that other components will use for defining provider dependencies
A Service is instantiated only once. Components that define that services as a dependency will share that instance,
  which allows for services to act as brokers for sharing data between components and saves memory use

DEPENDENCY INJECTION is a system that supplies instances of a dependency at the time your class is instantiated:
  you don't need the service to import and instantiate a dependency, the dependency injection system does it for you.
When the constructor of your service executes, it will receive an instance of a dependency that the dependency injection system already created.
  The service will use the injected code instead of the imported class

A DECORATOR is a Typescript feature that adds some properties or behavior to a class or method
@Injectable is the Angular decorator for Services: marks the service as a class that can serve as a provider for Angular's dependency injection system.
*/


import { Injectable } from '@angular/core';
// import the class so that you can use the token to define the dependency
import { BrowserStorage } from './browser-storage.service';

export interface IContactPreference {
  key: string;
  value: string | object;
}

@Injectable()
export class PreferencesService {
  // Angular dependency injection uses the service constructor to look up and supply dependencies
  constructor(private browserStorage: BrowserStorage ) { }

  // preferences service uses injected services, no BrowserStorage directly
  public saveProperty(preference: IContactPreference) {
    if (!preference.key.length) {
      throw new Error('saveProperty requires a non-blank property name');
    }
    this.browserStorage.setItem(preference.key, preference.value);
  }

  public getProperty(key: string) : any {
    return this.browserStorage.getItem(key);
  }
}
