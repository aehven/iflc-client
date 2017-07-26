import { browser, element, by } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/home');
  }

  getCeeButton() {
    return element(by.id('cee-button'));
  }

  getFlavorButton() {
    return element(by.id('flavor-button'));
  }
}
