const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
require('dotenv').config();

const connect = require('./dbConnection/connect');
const userModel = require('./models/userModel');
// need to make an asynchronus function - i.e. bot has to wait for things to happen
(async function () {
    connect(process.env.mongoUri)
    console.log('dbConnected')

})();

//getting date
(async function () {

    const presentDate = new Date();

    //to create user Info
    await userModel.create({ name: "abc" })

    // getting all users from database
    const data = await userModel.find()


    console.log(data);
    //getting Only date from data array
    let allDate = data.map(date => date.date)
    console.log(allDate)
    //checking if any of the following dates in allDate array matches the presentDate
    for (let i = 0; i < allDate.length; i++) {
        if (allDate[i].getMonth() === presentDate.getMonth() && allDate[i].getDate() === presentDate.getDate()) {
            console.log("found")
            main();
        } else {
            console.log("not same")
        }
    }
})();

async function main() {

    try {
        // Configures puppeteer
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
        );

        //Navigates to Whatsapp
        await page.goto("https://web.whatsapp.com/");
        await page.waitForSelector("._3hKpJ");
        await delay(5000);

        //Change to contact you want to send messages to
        const contactName = "Bakchodi 👉🏻👌🏻";
        await page.click(`span[title='${contactName}']`);
        await page.waitForSelector("._1LbR4");

        //Finds the message bar and focuses on it
        const editor = await page.$("div[data-tab='10']"); //whatsapp web has div "data-tab=1" for message inputs
        await editor.focus();

        // display message
        await page.evaluate(() => {

            // greeting array
            var greetings = ["hbd", "happy birthday", "Wishing you a prosperous year ahead",
                "hope you got the money", "party when ?", "happy bday"];

            var randGreet = greetings[Math.floor(Math.random() * greetings.length)];

            // document.execCommand("insertText", false, randGreet);
            document.execCommand("insertText", false, randGreet);
        });
        await page.click("span[data-testid='send']");
        await delay(500);

    }

    catch (e) {
        console.error("error mine", e); // logging errors; keeping track
    }

}

// function for time delay
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
