import { browser, element, by } from 'protractor';

export class FormPage {
  getInput(controlName) {
    return element(by.css('[formControlName=' + controlName + ']'));
  }

  getInputValue(controlName) {
    return this.getInput(controlName).getAttribute('value');
  }

  setInput(controlName, value) {
    this.getInput(controlName).clear().then(() => {
      this.getInput(controlName).sendKeys(value);
    });
  }

  edit() {
    element(by.partialButtonText('Edit')).click();
  }

  submit() {
    element(by.partialButtonText('Submit')).click();
  }

  cancel() {
    element(by.partialButtonText('Cancel')).click();
  }

  // getSuccessNotification() {
  //   return element(by.css('.success'));
  // }
  //
  // ackSuccess() {
  //   this.getSuccessNotification().click();
  //   browser.sleep(600);
  // }
}
