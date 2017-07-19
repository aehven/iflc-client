import { browser, element, by } from 'protractor';
import { FormPage } from './form.po';

export class UserPage extends FormPage {
  constructor() { super(); }

  navigateTo(userId) {
    return browser.get('/user/'+userId);
  }
}
