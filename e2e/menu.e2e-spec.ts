import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';

describe('Menu', function() {
  let loginPage: LoginPage;
  let menu: Menu;

  beforeEach(() => {
    loginPage = new LoginPage();
    menu = new Menu();
    loginPage.navigateTo();
  });

  it('should have only reload link when not logged in', () => {
    expect(menu.getReloadLink().isPresent()).toBeTruthy();
    expect(menu.getUsersLink().isPresent()).toBeFalsy();
    expect(menu.getCeesLink().isPresent()).toBeFalsy();
    expect(menu.getFlavorsLink().isPresent()).toBeFalsy();
    expect(menu.getProfileLink().isPresent()).toBeFalsy();
    expect(menu.getLogOutLink().isPresent()).toBeFalsy();
  });

  it('should have all links if logged in as admin', () => {
    loginPage.logIn("a0@null.com", "password");
    expect(menu.getReloadLink().isPresent()).toBeTruthy();
    expect(menu.getUsersLink().isPresent()).toBeTruthy();
    expect(menu.getCeesLink().isPresent()).toBeTruthy();
    expect(menu.getFlavorsLink().isPresent()).toBeTruthy();
    expect(menu.getProfileLink().isPresent()).toBeTruthy();
    expect(menu.getLogOutLink().isPresent()).toBeTruthy();
    menu.getLogOutLink().click();
  });

  it('should have all except users link if logged in as regular user', () => {
    loginPage.logIn("r0@null.com", "password");
    expect(menu.getReloadLink().isPresent()).toBeTruthy();
    expect(menu.getUsersLink().isPresent()).toBeFalsy();
    expect(menu.getCeesLink().isPresent()).toBeTruthy();
    expect(menu.getFlavorsLink().isPresent()).toBeTruthy();
    expect(menu.getProfileLink().isPresent()).toBeTruthy();
    expect(menu.getLogOutLink().isPresent()).toBeTruthy();
    menu.getLogOutLink().click();
  });
})
