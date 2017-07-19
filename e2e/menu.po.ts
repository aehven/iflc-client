import { element, by } from 'protractor';

export class Menu {
  getUsersLink() {
    return element(by.id('menu-users'));
  }

  getAccountsLink() {
    return element(by.id('menu-accounts'));
  }

  getContactsLink() {
    return element(by.id('menu-contacts'));
  }

  getProfileLink() {
    return element(by.id('menu-profile'));
  }

  getLogOutLink() {
    return element(by.id('menu-log-out'));
  }

  getReloadLink() {
    return element(by.id('menu-reload'));
  }
}
