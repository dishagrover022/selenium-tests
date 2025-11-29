const { Builder, By, Key, until } = require('selenium-webdriver');
const SauceLabs = require('saucelabs').default;
const assert = require('assert');
const utils = require('./utils');

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

/**
 * Task I: Update the test code so when it runs, the test clicks the "I am a link" link.
 * Task II: Comment out Task I and write "Sauce" in the text box.
 * Task III: Fill email + comments and click Send.
 * Task IV: Add a tag capability.
 * Task V: Set the status to "passed".
 */

describe('Working Sauce', function () {
  it('should go to guinea pig page and click link', async function () {
    let driver = await new Builder()
      .withCapabilities(utils.workingCapabilities)
      .usingServer(ONDEMAND_URL)
      .build();

    try {
      // Goes to Sauce Lab's guinea-pig page and verifies the title
      await driver.get('https://saucelabs.com/test/guinea-pig');
      await assert.strictEqual(
        'I am a page title - Sauce Labs',
        await driver.getTitle()
      );

      // Task I: Click the "I am a link" link
 	//await driver.findElement(By.linkText('i am a link')).click();


      // Task II: (comment out Task I before doing this)
   	await driver.findElement(By.id('i_am_a_textbox')).sendKeys('Sauce');


      // Task III: (later)
      //await driver.findElement(By.id('fbemail')).sendKeys('test@example.com');
      //await driver.findElement(By.id('comments')).sendKeys('This is a comment');
      //await driver.findElement(By.id('submit')).click();

    } finally {
      await driver.quit();
    }
  });
});