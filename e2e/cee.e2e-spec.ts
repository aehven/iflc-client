/////
//Modifies Cees 1,2
/////

import { browser, element, by } from 'protractor'
import {} from 'jasmine'; //this is only necessary to silence errors in Atom; ng does this automatically.
import { LoginPage } from './login.po';
import { Menu } from './menu.po';
import { CeePage } from './cee.po';
import { FlavorsPage } from './flavors.po';
import { FlavorPage } from './flavor.po';
import { NotesPage } from './notes.po';

describe('Cee page', function() {
  let loginPage: LoginPage;
  let menu: Menu;
  let ceePage: CeePage;
  let flavorsPage: FlavorsPage;
  let flavorPage: FlavorPage;
  let notesPage: NotesPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    ceePage = new CeePage();
    flavorsPage = new FlavorsPage();
    flavorPage = new FlavorPage();
    notesPage = new NotesPage();
    menu = new Menu();

    loginPage.navigateTo();
    loginPage.logIn("a0@null.com", "password");
    menu.getCeesLink().click();
  });

  afterEach(() => {
    menu.getLogOutLink().click();
  });

  it('should have the correct heading', () => {
    element(by.linkText("Cee 1")).click();
    expect(ceePage.getCeeName()).toContain('Cee 1');
    expect(ceePage.getFlavorsLink().getText()).toContain('Flavors');
    expect(ceePage.getFlavorsLink().getAttribute('href')).toContain('flavors/1');
    expect(ceePage.getNotesLink().getText()).toContain('Note');
    expect(ceePage.getNotesLink().getAttribute('href')).toContain('notes/1');
  })

  it('should update values', () => {
    element(by.linkText("Cee 1")).click();

    ceePage.edit();

    ceePage.setInput('name', "pink floyd");
    ceePage.setInput('fd1', "roger waters");
    ceePage.setInput('fd2', "david gilmore");
    ceePage.setInput('rc', "john lennon");
    ceePage.setInput('phone', "paul mccartney");
    ceePage.setInput('street', "george harrison");
    ceePage.setInput('city', "ringo starr");
    ceePage.setInput('zip', "freddy mercury");
    ceePage.setInput('fax', "mark knopfler");
    ceePage.setInput('website', "sting");
    ceePage.setInput('om', "van morrison");

    expect(ceePage.getCeeName()).toContain('pink floyd');

    ceePage.submit();
    browser.sleep(6000);

    menu.getCeesLink().click();

    element(by.linkText("pink floyd")).click();

    expect(ceePage.getCeeName()).toContain('pink floyd');
    expect(ceePage.getInputValue('fd1')).toBe("roger waters");
    expect(ceePage.getInputValue('fd2')).toBe("david gilmore");
    expect(ceePage.getInputValue('rc')).toBe("john lennon");
    expect(ceePage.getInputValue('phone')).toBe("paul mccartney");
    expect(ceePage.getInputValue('street')).toBe("george harrison");
    expect(ceePage.getInputValue('city')).toBe("ringo starr");
    expect(ceePage.getInputValue('zip')).toBe("freddy mercury");
    expect(ceePage.getInputValue('fax')).toBe("mark knopfler");
    expect(ceePage.getInputValue('website')).toBe("sting");
    expect(ceePage.getInputValue('om')).toBe("van morrison");
  })

  it('should link to its own flavors', () => {
    element(by.linkText("Cee 2")).click();
    ceePage.getFlavorsLink().click();

    expect(flavorsPage.getTitle()).toBe('Flavors (3) for Cee 2');
    expect(flavorsPage.getRows().count()).toBe(3);

    element(by.linkText('l3_a2, f3_a2')).click();
    expect(flavorPage.getFlavorName()).toContain('f3_a2 l3_a2');
    expect(flavorPage.getCeeLink().getText()).toContain('Cee 2');
    expect(flavorPage.getCeeLink().getAttribute('href')).toContain('cee/2');

    flavorPage.getCeeLink().click()
    expect(ceePage.getCeeName()).toContain('Cee 2');
  })

  it('should link to its own notes', () => {
    element(by.linkText("Cee 2")).click();

    ceePage.getNotesLink().click();

    expect(notesPage.getTitle()).toBe('Note (3) for Cee 2');
    expect(notesPage.getCeeLink().getAttribute('href')).toContain('cee/2');

    // expect(notesPage.textAreasFind('note 1 for cee Cee 2')).toBeTruthy();
  })
})
