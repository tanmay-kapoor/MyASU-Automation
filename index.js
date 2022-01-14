const automate = async () => {
    const cmd = require("node-cmd");
    const webdriver = require("selenium-webdriver");
    require("chromedriver");
    const chrome = require("selenium-webdriver/chrome");

    const options = new chrome.Options();
    options.setChromeBinaryPath(process.env.CHROME_BINARY_PATH);
    const serviceBuilder = new chrome.ServiceBuilder(
        process.env.CHROME_DRIVER_PATH
    );

    const screen = {
        width: 1920,
        height: 1080,
    };

    // Essential for heroku
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.windowSize(screen);

    const driver = new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(ooptions)
        .setChromeService(serviceBuilder)
        .build();

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
