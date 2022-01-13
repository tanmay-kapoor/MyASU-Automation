const webdriver = require("selenium-webdriver");
const cmd = require("node-cmd");

const automate = async () => {
    const driver = new webdriver.Builder().forBrowser("chrome").build();

    await driver.get("https://webapp4.asu.edu/myasu/");
    driver.findElement(webdriver.By.id("username")).sendKeys("tkapoor4");
    driver.findElement(webdriver.By.id("password")).sendKeys("Fruitninja!1");
    await driver.findElement(webdriver.By.name("submit")).click();

    const text = await driver
        .findElement(
            webdriver.By.xpath(
                "//div[@class='app-section-title-left']/div[1]/div[2]"
            )
        )
        .getText();

    await driver.findElement(webdriver.By.css(".signout")).click();
    driver.quit();

    cmd.runSync(`node sendMail.js ${text}`);
    setTimeout(await automate, 5000);
};

const foo = async () => {
    await automate();
};

foo();
