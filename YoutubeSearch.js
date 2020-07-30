const { Builder, By, Key, util, until } = require("selenium-webdriver");
var numeral = require('numeral');
let driver = new Builder().forBrowser('chrome').build();
let urls = []
let views = []
let coeffient = [] // (likes/views) * (likes/dislikes)
let bestvideo = ''


async function ytsearch(topic, length) {
    let url = 'https://www.youtube.com/results?search_query=' + topic + ', ' + length;
    await driver.get(url)
    await grabURLSandViews()
    await getBestVideo()
    driver.quit()

}

async function grabURLSandViews() {
    driver.wait(until.elementLocated(By.id('video-title', 1000)))
    let alllink = await (await driver).findElements(By.id('video-title'))
    for (const ele of alllink) {
        let url = await ele.getAttribute('href')
        urls.push(url)
    }
    let allviews = await (await driver).findElements(By.xpath('//*[@id="metadata-line"]/span[1]'))
    for (const ele of allviews) {
        let txt = await ele.getText()
        let splittxt = txt.split(" ")
        let numtxt = splittxt[0].toLowerCase()
        let convertednum = numeral(numtxt).value()
        views.push(convertednum)
    }
}

async function getBestVideo() {
    let driver1 = new Builder().forBrowser('chrome').build();
    for (let i = 0; i < 5; i++) {
        await (await driver1).get(urls[i])
        let viewcount = views[i]
        let rawlikes = (await (await (await driver).findElement(By.xpath('//ytd-toggle-button-renderer[1]/a/yt-formatted-string'))).getText()).toLowerCase()
        let rawdislikes = (await (await (await driver).findElement(By.xpath('//ytd-toggle-button-renderer[2]/a/yt-formatted-string'))).getText()).toLowerCase()
        console.log(numeral(rawlikes).value())
        console.log(numeral(rawdislikes).value())



    }

}

async function test() {
    (await driver).get('https://www.youtube.com/watch?v=JrWJnwCMlP0')
    let likeelement = ((await (await driver).findElement(By.xpath('//*[@id="text"]'))))

    // let rawdislikes = await (await (await (await driver).findElement(By.xpath('//ytd-toggle-button-renderer[2]/a'))).getText()).toLowerCase()
    console.log(rawlikes)
    // console.log(numeral(rawdislikes).value())
}
test()
// //*[@id="metadata-line"]/span[1]
//*[@id="metadata-line"]/span[1]
//ytsearch('overview of precalculus', 'long')
