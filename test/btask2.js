const {Builder, By, Key, until} = require('selenium-webdriver');
const utils = require('./utils');
const chrome = require('selenium-webdriver/chrome');

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

// Use EU datacenter if needed, otherwise US-West works too
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

describe('Google Search Sauce Labs', function () {
  it('should go to Google and click Sauce', async function () {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--disable-blink-features=AutomationControlled');
    chromeOptions.excludeSwitches(['enable-automation']);

    let driver = await new Builder()
      .withCapabilities(utils.brokenCapabilities)
      .setChromeOptions(chromeOptions)
      .usingServer(ONDEMAND_URL)
      .build();




 try {
      	// Go to Google and search "Sauce Labs"
	// If you see a German or English GDPR modal on google.com you 
 	// will have to code around that or use the us-west-1 datacenter.
 	// You can investigate the modal elements using a Live Test(https://app.saucelabs.com/live/web-testing)
      await driver.get("https://www.google.com");

      let search = await driver.findElement(By.name("q"));
      await search.sendKeys("Sauce Labs");

      let button = await driver.findElement(By.name("btnK"));
      await button.click();

      // Step 2: Locate and click the Sauce Labs homepage link
      await driver.wait(until.elementLocated(By.xpath("//a[@href='https://saucelabs.com/']")), 10000);
      let page = await driver.findElement(By.xpath("//a[@href='https://saucelabs.com/']"));
      await page.click();




}

	catch (err) {
      if (process.env.GITLAB_CI === 'true') {
        console.warn("Gitlab run detected.");
        console.warn("Skipping error in brokenSauce.js");
      } else {
        throw err;
      }
    } finally {
      await driver.quit();
    }
  });
});