import { browser, element, by } from 'protractor';

export class TablePage {
  getRows() {
    return element.all(by.tagName('tr'));
  }

  getRowCount() {
    return this.getRows().count()
  }
}
