import { browser, element, by } from 'protractor';
import { TablePage } from './table.po'

export class FlavorsPage extends TablePage {
  constructor() { super(); }

  navigateTo(ceeId) {
    return browser.get('/flavors/' + ceeId);
  }

  getTitle() {
    return element(by.tagName('h2')).getText();
  }
}
