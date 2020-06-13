const { browser } = require('protractor');
const { expect } = require('chai');
var loginPage = require('../page-objects/login-page.po.js');
var homePage = require('../page-objects/home.po.js');

describe('Agendar Atendimento', function () {
  beforeAll(async function () {
    await browser.get('http://localhost:4200/');
  });

  it('Realizar Agendamento', async function () {
    await loginPage.login('username1', '1234');
    await browser.wait(ExpectedConditions.elementToBeClickable($('.mat-raised-button.mat-button-base.mat-primary')), 10000);
    await $('.mat-raised-button.mat-button-base.mat-primary').click();
    //expect(await $('.form-login h2').getText()).to.be.eq('Agendamento');
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-select-0')));
    await $('#mat-select-0').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-option-12')));
    await $('#mat-option-12').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-select-1')));
    await $('#mat-select-1').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-option-17')));
    await $('#mat-option-17').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-select-2')));
    await $('#mat-select-2').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-option-19')));
    await $('#mat-option-19').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#cdk-step-label-0-1')));
    await $('#cdk-step-label-0-1').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('.mat-icon-button.mat-button-base')));
    await $('.mat-icon-button.mat-button-base').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('.mat-calendar-body-cell-content.mat-calendar-body-today')));
    await $('.mat-calendar-body-cell-content.mat-calendar-body-today').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-select-3')));
    await $('#mat-select-3').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-option-10')));
    await $('#mat-option-10').click();
    await browser.wait(ExpectedConditions.elementToBeClickable($('#mat-button-toggle-2-button')));
    await $('#mat-button-toggle-2-button').click();
    browser.sleep(2000);
    expect(await homePage.getTextoMyBarber()).to.be.eq('My Barber')
  });
})
