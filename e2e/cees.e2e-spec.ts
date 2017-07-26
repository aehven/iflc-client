import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';
import { CeesPage } from './cees.po';

describe('Menu', function() {
  let loginPage: LoginPage;
  let menu: Menu;
  let ceesPage: CeesPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    menu = new Menu();
    ceesPage = new CeesPage();
    loginPage.navigateTo();
    loginPage.logIn("a0@null.com", "password");
    menu.getCeesLink().click();
  });

  afterEach(() => {
    menu.getLogOutLink().click();
  });

  it('should show a list of cees', () => {
    expect(ceesPage.getTitle()).toBe('Cees (5)');
    expect(ceesPage.getRows().count()).toBe(5);
  })
})
