const {Builder, By, Key, until} = require('selenium-webdriver')
const SauceLabs = require('saucelabs').default;
const assert = require('assert');
const utils = require('./utils')

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

//Task I: Update the test code so when it runs, the test clicks the "I am a link" link.

describe('Task I: Link Navigation', function () {
    it('should click the "I am a link" and verify navigation', async function () {
        let driver = await new Builder()
            .withCapabilities({
                ...utils.workingCapabilities,
                browserName: "chrome",
                platformName: "Windows 11",
                "sauce:options": {
                    name: "Task I - Link Navigation",
                    build: "build-001",
                    tags: ["task-I"]
                }
            })
            .usingServer(ONDEMAND_URL)
            .build();

        try {
            // Step 1: Navigate to guinea-pig page
            await driver.get("https://saucelabs.com/test/guinea-pig");
            await assert.strictEqual(
                "I am a page title - Sauce Labs",
                await driver.getTitle()
            );

            // Step 2: Click the "I am a link" link
            await driver.findElement(By.linkText("i am a link")).click();

            // Step 3: Wait until the new page loads
            await driver.wait(until.urlContains("test-guinea-pig2.html"), 5000);

            // Step 4: Verify content on the new page
            const divText = await driver.findElement(By.id("i_am_an_id")).getText();
            assert.strictEqual(divText, "I am another div");

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