import { browser, element, by } from 'protractor';
import { TablePage } from './table.po'

export class CeesPage extends TablePage {
  navigateTo() {
    return browser.get('/cees');
  }

  getTitle() {
    return element(by.tagName('h2')).getText();
  }
}
