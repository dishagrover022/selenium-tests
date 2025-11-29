const {Builder, By, Key, until} = require('selenium-webdriver')
const SauceLabs = require('saucelabs').default;
const assert = require('assert');
const utils = require('./utils')

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

// Task III - Add "Email", "Commment" & click send button
describe('Task III: Add Email, Commment & click send button', function () {
    it('should add email comment and click send button', async function () {
        let driver = await new Builder()
            .withCapabilities({
                ...utils.workingCapabilities,
                browserName: "chrome",
                platformName: "Windows 11",
                "sauce:options": {
                    name: "Task III - Add email comment and send button",
                    build: "build-001",
                    tags: ["task-III"]
                }
            })
            .usingServer(ONDEMAND_URL)
            .build();


try {

	// Step 1: Navigate to guinea-pig page
            await driver.get("https://saucelabs.com/test/guinea-pig");

	// Task III: Fill email, comments, and click Send
            await driver.findElement(By.id("fbemail")).sendKeys("emailpassed@example.com");
            await driver.findElement(By.id("comments")).sendKeys("test comment entered.");

	// Wait until the Send button is present and visible
 
	let sendButton = await driver.wait(until.elementLocated(By.id("submit")), 5000);
            await driver.wait(until.elementIsVisible(sendButton), 5000);
            await driver.wait(until.elementIsEnabled(sendButton), 5000);

	 // Scroll into view and click
            await driver.executeScript("arguments[0].scrollIntoView(true);", sendButton);
            await sendButton.click();


	 // ✅ Mark job as passed
            await driver.executeScript("sauce:job-result=passed");

        } catch (err) {
            // ❌ Mark job as failed if something goes wrong
            await driver.executeScript("sauce:job-result=failed");
            throw err;
        } finally {
            await driver.quit();
        }
    });
});

