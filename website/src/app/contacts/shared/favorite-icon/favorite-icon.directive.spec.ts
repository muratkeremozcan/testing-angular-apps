// import Angular dependencies
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
// import dependencies for the Contacts app
import { constants } from './favorite-icon.constants';
import { FavoriteIconDirective } from './favorite-icon.directive';
import { getStarElement, doClassesMatch } from '../../testing';
// to test a directive you need a host component that uses it. Host component will have a different <i> element per test case
@Component({
  template: `
    <i [appFavoriteIcon] ="true"></i>
    <i [appFavoriteIcon] ="false"></i>
    <i [appFavoriteIcon] ="true" [color]="'blue'"></i>
    <i [appFavoriteIcon] ="true" [color]="'cat'"></i>
  `
})
class TestComponent { }

describe('Directive: FavoriteIconDirective', () => {
  // fixture: stores an instance of the ComponentFixture, which contains methods that help debug and test a component
  let fixture: ComponentFixture<any>;
  const expectedSolidStarList = constants.classes.SOLID_STAR_STYLE_LIST; // an array of classes for a solid star
  const expectedOutlineStarList = constants.classes.OUTLINE_STAR_STYLE_LIST; // an array of classes for an outlined star

  beforeEach(() => {
    // declare the testModuleMetadata to contain the information needed to configure TestBed
      // the difference from chapter 3 is that we create a variable testModuleMetadata to contain the data
      // this object will conform to the TestModuleMetadata interface and get passed in to the configureTestingModule method
      // configureTestingModule configures the TestBed on line 37
    const testModuleMetadata: TestModuleMetadata = {
      declarations: [FavoriteIconDirective, TestComponent]
    };
    // configure TestBed using the testModuleMetadata variable
      // TestBed is a class that you use to setup and configure your tests
      // use it any time you want to write a unit test that tests components, directives and services
    // the fixture variable stores the component-like object from the TestBed.createComponent method
      // createComponent is used to return an instance of ComponentFixture
    fixture = TestBed.configureTestingModule(testModuleMetadata).createComponent(TestComponent);
    // detectChanges: invoke change detection in unit tests and render updated data whenever an event occurs
    fixture.detectChanges();
  });
  afterEach(() => { fixture = null; }); // make sure the fixture object is destroyed after each test

  // every test will follow this pattern
    // create new instance of a component
    // run some kind of event
    // check that the element changed as expected

  describe('When favorite icon is set to true', () => {
    let starElement; // reference the star element, set it to null
    beforeEach(() => {
      // in TestComponent (line 17) we created a template with 4 elements in an array, for our test cases
      const defaultTrueElementIndex = 0;
      // to get startElement from fixture, we use a helper method called getStarElement
        // it extracts a child element from the fixture
      starElement = getStarElement(fixture, defaultTrueElementIndex);
    });
    afterEach(() => { starElement = null; }); // reset starElement after each test

    it('should display a solid gold start after the page loads', () => {
      // check that the element includes a solid gold star after the page loads
      expect(starElement.style.color).toBe('gold');
      // check that the colors list matches the colors in our elements list, using doClassesMatch helper method
        // the method takes an element and a list of styles, makes sure they match by looping through the styles in the list
        // returns true if the element has all the expected styles
        // the style classes for a solid star are stored in the constant expectedSolidStarList on line 22
      expect(doClassesMatch(starElement.classList, expectedSolidStarList)).toBeTruthy();
    });

  });
});
