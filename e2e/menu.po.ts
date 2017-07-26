import { element, by } from 'protractor';

export class Menu {
  getUsersLink() {
    return element(by.id('menu-users'));
  }

  getCeesLink() {
    return element(by.id('menu-cees'));
  }

  getFlavorsLink() {
    return element(by.id('menu-flavors'));
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
