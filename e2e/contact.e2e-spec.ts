/////
//Modifies Contact 4 (in Account 2)
/////

import { browser, element, by } from 'protractor'
import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';
import { ContactPage } from './contact.po';

describe('Contact page', function() {
  let loginPage: LoginPage;
  let menu: Menu;
  let contactPage: ContactPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    menu = new Menu();
    contactPage = new ContactPage();
    loginPage.navigateTo();
    loginPage.logIn("a0@null.com", "password");
    menu.getContactsLink().click();
  });

  afterEach(() => {
    menu.getLogOutLink().click();
  });

  it('should update values', () => {
    element(by.linkText("l1_a2, f1_a2")).click();
    expect(contactPage.getContactName()).toContain('f1_a2 l1_a2');
    expect(contactPage.getAccountLink().getText()).toContain('Account 2');
    expect(contactPage.getAccountLink().getAttribute('href')).toContain('account/2');

    contactPage.edit();

    contactPage.setInput('first_name', "john");
    contactPage.setInput('last_name', "mellencamp");
    contactPage.setInput('phone', "1234567890");
    contactPage.setInput('cellphone', "0987654321");
    contactPage.setInput('email', "blah@null.com");
    contactPage.setInput('street', "911 main street");
    contactPage.setInput('city', "golden");
    contactPage.setInput('zip', "80401");

    expect(contactPage.getContactName()).toContain('john mellencamp');

    contactPage.submit();
    browser.sleep(6000);

    menu.getContactsLink().click();

    element(by.linkText("mellencamp, john")).click();

    expect(contactPage.getContactName()).toContain('john mellencamp');
    expect(contactPage.getInputValue('phone')).toBe("1234567890");
    expect(contactPage.getInputValue('cellphone')).toBe("0987654321");
    expect(contactPage.getInputValue('email')).toBe("blah@null.com");
    expect(contactPage.getInputValue('street')).toBe("911 main street");
    expect(contactPage.getInputValue('city')).toBe("golden");
    expect(contactPage.getInputValue('zip')).toBe("80401");
  })
})
