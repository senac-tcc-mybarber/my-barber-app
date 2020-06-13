const { browser } = require('protractor');
const { expect } = require('chai');
var loginPage = require('../page-objects/login-page.po.js');
var homePage = require('../page-objects/home.po.js');

describe('Cadastrar Cliente', function () {
  beforeAll(async function () {
    await browser.get('http://localhost:4200/');
  });

  it('Realizar Agendamento', async function () {
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-button-toggle-0-button')), 10000);
    await $('#mat-button-toggle-0-button').click();
    await browser.sleep(3000);
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-button-toggle-3-button')), 10000);
    await $('#mat-button-toggle-3-button').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-input-3')), 10000);
    await $('#mat-input-2').sendKeys('Usuário de Teste');
    await $('#mat-input-3').sendKeys('usuarioteste');
    await $('#mat-input-4').sendKeys('2199999999');
    await $('#mat-input-5').sendKeys('usuarioteste@email.com');
    await $('#mat-input-6').sendKeys('1234');
    await $('.mat-raised-button.mat-button-base').click();
    await browser.sleep(3000);
    await browser.wait(ExpectedConditions.elementToBeClickable($('.mat-icon.notranslate.material-icons.mat-icon-no-color')), 10000);
    await $('.mat-icon.notranslate.material-icons.mat-icon-no-color').click()
    await browser.wait(ExpectedConditions.elementToBeClickable($('.mat-list-item:nth-child(3)')), 10000);
    await $('.mat-list-item:nth-child(3)').click();
    await loginPage.login('usuarioteste', '1234');
    await browser.sleep(2000);
    await browser.wait(ExpectedConditions.elementToBeClickable($('.mat-icon.notranslate.material-icons.mat-icon-no-color')), 10000);
    expect(await homePage.getTextoMyBarber()).to.be.eq('My Barber');
  });
})
