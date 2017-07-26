import { browser, element, by } from 'protractor';
import { FormPage } from './form.po';

export class CeePage extends FormPage {
  constructor() { super(); }

  navigateTo(ceeId) {
    return browser.get('/cee/'+ceeId);
  }

  getCeeName() {
    return element(by.id('cee-name')).getText();
  }

  getFlavorsLink() {
    return element(by.id('flavors-link'));
  }

  getNotesLink() {
    return element(by.id('notes-link'));
  }
}
