import { Component, DebugElement, Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";


// routers are used to convert a url path to destination in the web application
// a router can be used to verify a user's credentials for access
// the process of starting and completing a route change is called life cycle
  // route guard: the check for whether a route change can continue

@Injectable()
class NavConfigService {
  menu = [{ label: 'Home', path: '/target/12'}]
}

// this is the component under test. It generates navigation links
@Component({
  selector: `navigation-menu`,
  template: `<div><a *ngFor="let item of menu" [id]="item.label" [routerLink]="item.path">{{ item.label }}</a></div>`,
})
// NavigationMenu component initializes with ngOnInit, receives its configuration from NavConfigService
  // and generates a list of links using routerLink directive
class NavigationMenu implements OnInit {
  menu: any;
  constructor(private navConfig: NavConfigService) { }
  ngOnInit() {
    this.menu = this.navConfig.menu;
  }
}

// the setup generates 2 components to facilitate the test, one for app fixture, one for the target
// you need  to configure at least 2 routes: initial route and a 2nd route to be the target of the navigation attempts
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
class AppComponent { }

@Component({
  selector: 'simple-component',
  template: 'simple'
})
class SimpleComponent { }

describe('Testing routes', () => {
  let fixture;
  let router: Router;
  let location: Location;


  beforeEach(() => {
    // configure RouterTestingModule with fake testing routes.
    // RouterTestingModule spies on navigation calls and makes their results available in the tests
      // TestBed uses RouterTestingModule. Before each test the RouterTestingModule loads the default route and updates the test fixture
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: '', component: NavigationMenu },
        { path: 'target/:id', component: SimpleComponent }
      ])],
      providers: [{
        provide: NavConfigService,
        useValue: { menu: [{ label: 'Home', path: '/target/fakeId' }] }
      }],
      declarations: [NavigationMenu, SimpleComponent, AppComponent],
    });
  });
  // the router will the initial page and advance the Angular application to settle any asynchronous events
    // when navigation event occurs it resolves asynchronously and you have to account for it in the test
  beforeEach(fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    // starts each test by navigating to the default route
    router.navigateByUrl('/');
    advance();
  }));

  // when using fakeAsync, you have to resolve outstanding async calls manually with the flush method,
    // then update the fixture with detect changes
    // here a helper method advance() is used
  function advance(): void {
    flushMicrotasks();
    fixture.detectChanges();
  }

  // this test gets a copy to a link, clicks it and checks with the Location service to see if the path updated to the expected target
  it('Tries to route to a page', fakeAsync(() => {
    const menu = fixture.debugElement.query(By.css('a'));
    menu.triggerEventHandler('click', { button: 0 });
    advance();
    expect(location.path()).toEqual('/target/fakeId');
  }));

});



