import { browser, element, by } from 'protractor';
import { TablePage } from './table.po'

export class AccountsPage extends TablePage {
  navigateTo() {
    return browser.get('/accounts');
  }

  getTitle() {
    return element(by.tagName('h2')).getText();
  }
}
