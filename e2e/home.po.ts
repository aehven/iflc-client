import { browser, element, by } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/home');
  }

  getAccountButton() {
    return element(by.id('account-button'));
  }

  getContactButton() {
    return element(by.id('contact-button'));
  }
}
