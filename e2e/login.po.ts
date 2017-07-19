import { browser, element, by } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getEmailLabel() {
    return element(by.id('email-label')).getText();
  }

  getEmailInput() {
    return element(by.css('input[name=email]'));
  }

  getPasswordLabel() {
    return element(by.id('password-label')).getText();
  }

  getPasswordInput() {
    return element(by.css('input[name=password]'));
  }

  getSubmitButton() {
    return element(by.id('submit-button'));
  }

  logIn(email, password) {
    this.getEmailInput().clear().then(() => {
      this.getEmailInput().sendKeys(email);
    });

    this.getPasswordInput().clear().then(() => {
      this.getPasswordInput().sendKeys(password);
    });

    this.getSubmitButton().click();
  }

  logOut() {
    element(by.id('menu-log-out')).click();
  }
}
