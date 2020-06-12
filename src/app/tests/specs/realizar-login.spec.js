const { browser } = require('protractor');
const { expect } = require('chai');
var loginPage = require('../pageObjects/login-page.po.js');
var homePage = require('../pageObjects/home.po.js');

describe('Login: ', function () {
  beforeAll(function () {
    browser.manage().window().maximize();
    browser.get('http://localhost:4200/');
  });

  it('Realizar login', async function () {
    await loginPage.login('username1', '1234');
    expect(await homePage.getTextoMyBarber()).to.be.eq('My Barber')
  });

  afterAll(function () {
    browser.close();
  });
});
