import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';
import { AccountsPage } from './accounts.po';

describe('Menu', function() {
  let loginPage: LoginPage;
  let menu: Menu;
  let accountsPage: AccountsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    menu = new Menu();
    accountsPage = new AccountsPage();
    loginPage.navigateTo();
    loginPage.logIn("a0@null.com", "password");
    menu.getAccountsLink().click();
  });

  afterEach(() => {
    menu.getLogOutLink().click();
  });

  it('should show a list of accounts', () => {
    expect(accountsPage.getTitle()).toBe('Accounts (5)');
    expect(accountsPage.getRows().count()).toBe(5);
  })
})
