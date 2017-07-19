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

  it('should have an account button', () => {
    expect(page.getAccountButton()).toBeTruthy();

    page.getAccountButton().click();
    expect(browser.getCurrentUrl()).toMatch(".*accounts");
  });

  it('should have a contact button', () => {
    expect(page.getContactButton()).toBeTruthy();

    page.getContactButton().click();
    expect(browser.getCurrentUrl()).toMatch(".*contacts");
  });
});
