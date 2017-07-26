import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';
import { FlavorsPage } from './flavors.po';

describe('Menu', function() {
  let loginPage: LoginPage;
  let menu: Menu;
  let ceesPage: FlavorsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    menu = new Menu();
    ceesPage = new FlavorsPage();
    loginPage.navigateTo();
    loginPage.logIn("a0@null.com", "password");
    menu.getFlavorsLink().click();
  });

  afterEach(() => {
    menu.getLogOutLink().click();
  });

  it('should show a list of countacts', () => {
    expect(ceesPage.getTitle()).toBe('Flavors (15)');
    expect(ceesPage.getRows().count()).toBe(15);
  })
})
