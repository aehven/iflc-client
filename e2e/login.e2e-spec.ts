import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';

describe('Login page', function() {
  let page: LoginPage;
  let email: any;
  let password: any;
  let submit: any;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should have login form', () => {
    page.navigateTo();
    expect(page.getEmailLabel()).toEqual('Email:');
    expect(page.getPasswordLabel()).toEqual('Password:');

    email = page.getEmailInput();
    password = page.getPasswordInput();
    submit = page.getSubmitButton();

    expect(email.isPresent()).toBeTruthy();
    expect(password.isPresent()).toBeTruthy();
    expect(submit.isPresent()).toBeTruthy();

    page.logIn('a1@null.com', 'password');
  });
});
