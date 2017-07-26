import { browser } from 'protractor';
import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.

import { LoginPage } from './login.po';
import { HomePage } from './home.po';

describe('Home page', function() {
  let loginPage: LoginPage;
  let page: HomePage;

  beforeEach(() => {
    loginPage = new LoginPage();
    page = new HomePage();

    loginPage.navigateTo();
    browser.executeScript("localStorage.removeItem('location')");
    loginPage.logIn('a0@null.com', 'password');
  });

  afterEach(() => {
    loginPage.logOut();
  })

  it('should have an cee button', () => {
    expect(page.getCeeButton()).toBeTruthy();

    page.getCeeButton().click();
    expect(browser.getCurrentUrl()).toMatch(".*cees");
  });

  it('should have a flavor button', () => {
    expect(page.getFlavorButton()).toBeTruthy();

    page.getFlavorButton().click();
    expect(browser.getCurrentUrl()).toMatch(".*flavors");
  });
});
