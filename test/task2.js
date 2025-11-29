const {Builder, By} = require('selenium-webdriver');
const utils = require('./utils');

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

// Task II - Write "Sauce" in the text box
describe('Task II: Add text Sauce', function () {
    it('should type "Sauce" into the textbox', async function () {
        let driver = await new Builder()
            .withCapabilities({
                ...utils.workingCapabilities,
                browserName: "chrome",
                platformName: "Windows 11",
                "sauce:options": {
                    name: "Task II - Add text Sauce",
                    build: "build-001",
                    tags: ["task-II"]
                }
            })
            .usingServer(ONDEMAND_URL)
            .build();

        try {
            // Step 1: Navigate to guinea-pig page
            await driver.get("https://saucelabs.com/test/guinea-pig");

            // Step 2: Type "Sauce" into the textbox
            await driver.findElement(By.id("i_am_a_textbox")).sendKeys("Sauce");

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
