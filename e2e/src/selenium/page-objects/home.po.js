const { element, browser } = require('protractor');

class HomePage {
  get textoMyBarber() { return $(".toolbar-tittle"); }

  async getTextoMyBarber() {
    browser.sleep(2000);
    console.log(await this.textoMyBarber.getText());
    return this.textoMyBarber.getText();
  }
}

module.exports = new HomePage();
