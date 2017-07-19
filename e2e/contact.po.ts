import { browser, element, by } from 'protractor';
import { FormPage } from './form.po';

export class ContactPage extends FormPage {
  constructor() { super(); }

  navigateTo(contactId) {
    return browser.get('/contact/'+contactId);
  }

  getContactName() {
    return element(by.id('contact-name')).getText();
  }

  getAccountLink() {
    return element(by.id('account-link'));
  }
}
