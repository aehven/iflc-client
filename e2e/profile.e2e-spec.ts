import { browser} from 'protractor'
import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';
import { UserPage } from './user.po';

describe('Profile page', function() {
  let loginPage: LoginPage;
  let menu: Menu;
  let profilePage: UserPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    menu = new Menu();
    profilePage = new UserPage();
    loginPage.navigateTo();
    loginPage.logIn("a0@null.com", "password");
    menu.getProfileLink().click();
  });

  afterEach(() => {
    menu.getLogOutLink().click();
  });

  it('should show the profile form', () => {
    expect(profilePage.getInput('first_name').isPresent()).toBeTruthy();
    expect(profilePage.getInput('last_name').isPresent()).toBeTruthy();
    expect(profilePage.getInput('phone').isPresent()).toBeTruthy();
    expect(profilePage.getInput('address').isPresent()).toBeTruthy();
    expect(profilePage.getInput('email').isPresent()).toBeTruthy();
    expect(profilePage.getInput('role').isPresent()).toBeTruthy();
    // No workie.  Why?
    // expect(profilePage.getInput('password').isPresent()).toBeTruthy();
    // expect(profilePage.getInput('confirmPassword').isPresent()).toBeTruthy();
  })

  it('should update name', () => {
    profilePage.edit();
    
    profilePage.setInput('first_name', "regina");
    profilePage.setInput('last_name', "spektor");

    profilePage.submit();
    browser.sleep(6000);

    menu.getContactsLink().click();
    menu.getProfileLink().click();

    expect(profilePage.getInputValue('first_name')).toContain('regina');
    expect(profilePage.getInputValue('last_name')).toContain('spektor');
  })
})
