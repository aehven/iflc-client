import { browser, element, by } from 'protractor';
import { TablePage } from './table.po'

export class ContactsPage extends TablePage {
  constructor() { super(); }

  navigateTo(accountId) {
    return browser.get('/contacts/' + accountId);
  }

  getTitle() {
    return element(by.tagName('h2')).getText();
  }
}
