/////
//Modifies Flavor 4 (in Cee 2)
/////

import { browser, element, by } from 'protractor'
import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';
import { FlavorPage } from './flavor.po';

describe('Flavor page', function() {
  let loginPage: LoginPage;
  let menu: Menu;
  let flavorPage: FlavorPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    menu = new Menu();
    flavorPage = new FlavorPage();
    loginPage.navigateTo();
    loginPage.logIn("a0@null.com", "password");
    menu.getFlavorsLink().click();
  });

  afterEach(() => {
    menu.getLogOutLink().click();
  });

  it('should update values', () => {
    element(by.linkText("l1_a2, f1_a2")).click();
    expect(flavorPage.getFlavorName()).toContain('f1_a2 l1_a2');
    expect(flavorPage.getCeeLink().getText()).toContain('Cee 2');
    expect(flavorPage.getCeeLink().getAttribute('href')).toContain('cee/2');

    flavorPage.edit();

    flavorPage.setInput('first_name', "john");
    flavorPage.setInput('last_name', "mellencamp");
    flavorPage.setInput('phone', "1234567890");
    flavorPage.setInput('cellphone', "0987654321");
    flavorPage.setInput('email', "blah@null.com");
    flavorPage.setInput('street', "911 main street");
    flavorPage.setInput('city', "golden");
    flavorPage.setInput('zip', "80401");

    expect(flavorPage.getFlavorName()).toContain('john mellencamp');

    flavorPage.submit();
    browser.sleep(6000);

    menu.getFlavorsLink().click();

    element(by.linkText("mellencamp, john")).click();

    expect(flavorPage.getFlavorName()).toContain('john mellencamp');
    expect(flavorPage.getInputValue('phone')).toBe("1234567890");
    expect(flavorPage.getInputValue('cellphone')).toBe("0987654321");
    expect(flavorPage.getInputValue('email')).toBe("blah@null.com");
    expect(flavorPage.getInputValue('street')).toBe("911 main street");
    expect(flavorPage.getInputValue('city')).toBe("golden");
    expect(flavorPage.getInputValue('zip')).toBe("80401");
  })
})
