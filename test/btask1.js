const {Builder, By} = require('selenium-webdriver');
const utils = require('./utils');
const chrome = require('selenium-webdriver/chrome');

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

describe('Broken Sauce', function () {
    it('should go to Google and click Sauce', async function () {
        let driver;
        try {
            const chromeOptions = new chrome.Options();
            chromeOptions.addArguments('--disable-blink-features=AutomationControlled');
            chromeOptions.excludeSwitches(['enable-automation']);

            driver = await new Builder()
                .withCapabilities(utils.brokenCapabilities)
                .setChromeOptions(chromeOptions)
                .usingServer(ONDEMAND_URL)
                .build();

            await driver.get("https://www.google.com");

          
            let search = await driver.findElement(By.name("Search")); 
            await search.sendKeys("Sauce Labs");

            let button = await driver.findElement(By.name("btnK"));
            await button.click();

            let page = await driver.findElement(By.partialLinkText("sauce"));

            // If everything  passes, mark job passed
            await driver.executeScript("sauce:job-result=passed");

        } catch (err) {
            // Explicitly mark job as failed
            if (driver) {
                await driver.executeScript("sauce:job-result=failed");
            }
            throw err;
        } 
	finally {
            if (driver) {
                await driver.quit();
            }
        }
    });
});