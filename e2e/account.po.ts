import { browser, element, by } from 'protractor';
import { FormPage } from './form.po';

export class AccountPage extends FormPage {
  constructor() { super(); }

  navigateTo(accountId) {
    return browser.get('/account/'+accountId);
  }

  getAccountName() {
    return element(by.id('account-name')).getText();
  }

  getContactsLink() {
    return element(by.id('contacts-link'));
  }

  getActivitiesLink() {
    return element(by.id('activities-link'));
  }
}
