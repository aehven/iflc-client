import { browser, element, by } from 'protractor';

export class ActivitiesPage {

  navigateTo(accountId) {
    return browser.get('/activities/'+accountId);
  }

  getTitle() {
    return element(by.tagName('h2')).getText();
  }

  getAccountLink() {
    return element(by.id('account-link'));
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
