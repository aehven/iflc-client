import { browser, element, by } from 'protractor';
import { FormPage } from './form.po';

export class FlavorPage extends FormPage {
  constructor() { super(); }

  navigateTo(flavorId) {
    return browser.get('/flavor/'+flavorId);
  }

  getFlavorName() {
    return element(by.id('flavor-name')).getText();
  }

  getCeeLink() {
    return element(by.id('cee-link'));
  }
}
