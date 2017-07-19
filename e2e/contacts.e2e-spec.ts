import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';
import { ContactsPage } from './contacts.po';

describe('Menu', function() {
  let loginPage: LoginPage;
  let menu: Menu;
  let accountsPage: ContactsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    menu = new Menu();
    accountsPage = new ContactsPage();
    loginPage.navigateTo();
    loginPage.logIn("a0@null.com", "password");
    menu.getContactsLink().click();
  });

  afterEach(() => {
    menu.getLogOutLink().click();
  });

  it('should show a list of countacts', () => {
    expect(accountsPage.getTitle()).toBe('Contacts (15)');
    expect(accountsPage.getRows().count()).toBe(15);
  })
})
