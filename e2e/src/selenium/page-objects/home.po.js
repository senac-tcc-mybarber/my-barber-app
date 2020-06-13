const { element, browser } = require('protractor');

class HomePage {
  get textoMyBarber() { return element(by.css('.toolbar-tittle')) }

  async getTextoMyBarber() {
    browser.sleep(5000);
    console.log(await this.textoMyBarber.getText());
    return this.textoMyBarber.getText();
  }
}

module.exports = new HomePage();
