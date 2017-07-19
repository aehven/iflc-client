/////
//Modifies Accounts 1,2
/////

import { browser, element, by } from 'protractor'
import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';
import { AccountPage } from './account.po';
import { ContactsPage } from './contacts.po';
import { ContactPage } from './contact.po';
import { ActivitiesPage } from './activities.po';

describe('Account page', function() {
  let loginPage: LoginPage;
  let menu: Menu;
  let accountPage: AccountPage;
  let contactsPage: ContactsPage;
  let contactPage: ContactPage;
  let activitiesPage: ActivitiesPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    accountPage = new AccountPage();
    contactsPage = new ContactsPage();
    contactPage = new ContactPage();
    activitiesPage = new ActivitiesPage();
    menu = new Menu();

    loginPage.navigateTo();
    loginPage.logIn("a0@null.com", "password");
    menu.getAccountsLink().click();
  });

  afterEach(() => {
    menu.getLogOutLink().click();
  });

  it('should have the correct heading', () => {
    element(by.linkText("Account 1")).click();
    expect(accountPage.getAccountName()).toContain('Account 1');
    expect(accountPage.getContactsLink().getText()).toContain('Contacts');
    expect(accountPage.getContactsLink().getAttribute('href')).toContain('contacts/1');
    expect(accountPage.getActivitiesLink().getText()).toContain('Activity');
    expect(accountPage.getActivitiesLink().getAttribute('href')).toContain('activities/1');
  })

  it('should update values', () => {
    element(by.linkText("Account 1")).click();

    accountPage.edit();

    accountPage.setInput('name', "pink floyd");
    accountPage.setInput('fd1', "roger waters");
    accountPage.setInput('fd2', "david gilmore");
    accountPage.setInput('rc', "john lennon");
    accountPage.setInput('phone', "paul mccartney");
    accountPage.setInput('street', "george harrison");
    accountPage.setInput('city', "ringo starr");
    accountPage.setInput('zip', "freddy mercury");
    accountPage.setInput('fax', "mark knopfler");
    accountPage.setInput('website', "sting");
    accountPage.setInput('om', "van morrison");

    expect(accountPage.getAccountName()).toContain('pink floyd');

    accountPage.submit();
    browser.sleep(6000);

    menu.getAccountsLink().click();

    element(by.linkText("pink floyd")).click();

    expect(accountPage.getAccountName()).toContain('pink floyd');
    expect(accountPage.getInputValue('fd1')).toBe("roger waters");
    expect(accountPage.getInputValue('fd2')).toBe("david gilmore");
    expect(accountPage.getInputValue('rc')).toBe("john lennon");
    expect(accountPage.getInputValue('phone')).toBe("paul mccartney");
    expect(accountPage.getInputValue('street')).toBe("george harrison");
    expect(accountPage.getInputValue('city')).toBe("ringo starr");
    expect(accountPage.getInputValue('zip')).toBe("freddy mercury");
    expect(accountPage.getInputValue('fax')).toBe("mark knopfler");
    expect(accountPage.getInputValue('website')).toBe("sting");
    expect(accountPage.getInputValue('om')).toBe("van morrison");
  })

  it('should link to its own contacts', () => {
    element(by.linkText("Account 2")).click();
    accountPage.getContactsLink().click();

    expect(contactsPage.getTitle()).toBe('Contacts (3) for Account 2');
    expect(contactsPage.getRows().count()).toBe(3);

    element(by.linkText('l3_a2, f3_a2')).click();
    expect(contactPage.getContactName()).toContain('f3_a2 l3_a2');
    expect(contactPage.getAccountLink().getText()).toContain('Account 2');
    expect(contactPage.getAccountLink().getAttribute('href')).toContain('account/2');

    contactPage.getAccountLink().click()
    expect(accountPage.getAccountName()).toContain('Account 2');
  })

  it('should link to its own activities', () => {
    element(by.linkText("Account 2")).click();

    accountPage.getActivitiesLink().click();

    expect(activitiesPage.getTitle()).toBe('Activity (3) for Account 2');
    expect(activitiesPage.getAccountLink().getAttribute('href')).toContain('account/2');

    // expect(activitiesPage.textAreasFind('activity 1 for account Account 2')).toBeTruthy();
  })
})
