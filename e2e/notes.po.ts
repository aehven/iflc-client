import { browser, element, by } from 'protractor';

export class NotesPage {

  navigateTo(ceeId) {
    return browser.get('/notes/'+ceeId);
  }

  getTitle() {
    return element(by.tagName('h2')).getText();
  }

  getCeeLink() {
    return element(by.id('cee-link'));
  }

  getTextAreas() {
    return element.all(by.tagName('textarea'));
  }

  textAreasFind(term: string) {
    this.getTextAreas().each((element, index) => {
      element.getAttribute('value').then((text) => {
        console.log(text);
        if(text.indexOf(term) > -1) {
          return true;
        }
      })
    });
    return false;
  }
}
