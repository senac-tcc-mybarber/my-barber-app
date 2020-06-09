const { element, browser } = require('protractor');

class LoginPage {
  get etEmail() { return element(by.name('username')) }
  get etPassword() { return element(by.name('password')) }
  get btnEntrar() { return element(by.name('btnEntrar')) }

  async login(email, senha) {
    browser.wait(ExpectedConditions.elementToBeClickable(this.etEmail), 10000);
    this.etEmail.sendKeys(email);
    this.etPassword.sendKeys(senha);
    this.btnEntrar.click();
  }
}

module.exports = new LoginPage();
