const express = require('express');
const app = express();
const PORT = process.env.PORT || 2305; //picked arbitrary #
const bodyParser = require('body-parser');
const { Builder, By, Key, util, until } = require("selenium-webdriver");
var numeral = require('numeral');
const chrome = require('selenium-webdriver/chrome')
const options = new chrome.Options()
options.addArguments('--disable-dev-shm-usage')
options.addArguments('--no-sandbox')
options.addArguments('--headless')

var embededlink = "Null";

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("view options", { layout: false });
app.use('/', express.static(__dirname));
app.use(bodyParser.json());

app.post("/NemoText", async (req, res) => {
  // console.log('start post')
  var text = req.body["specifics"];
  link = await main(text);
  embededlink = link.replace("watch?v=", "embed/")
  // console.log("done getting link"); // test the passed value
  // console.log("from post" + embededlink); // test the passed value
  res.send('done');
});

app.get("/search", (req, res) => {
  // console.log('posting to webpage')
  res.render('search.ejs', { data: embededlink }); //not sure that's the data we want
});

async function main(input) {
  let urls = []
  let coefficient = [] // (likes/views) * (likes/ (likes + dislikes))
  let bestvideo = ''

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()

  let topic = input.substring(0, input.lastIndexOf(" ")).trim();
  let vidlength = input.substring(input.lastIndexOf(" ") + 1).trim();
  await ytsearch(topic, vidlength)

  async function ytsearch(topic, length) {
    let url = 'https://www.youtube.com/results?search_query=' + topic + ', ' + length;
    await driver.get(url)
    await grabUrls()
    await computeCoefficient()
    await getBestVid()
  }

  async function grabUrls() {
    await driver.wait(until.elementLocated(By.id('video-title', 1000)))
    let alllink = await (await driver).findElements(By.id('video-title'))
    for (const ele of alllink) {
      let url = await ele.getAttribute('href')
      try {
        urls.push(url.toString())

      } catch (error) {
        continue
      }
    }
  }

  async function computeCoefficient() {
    for (let i = 0; i < 3; i++) {
      let driver1 = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build()
      await (await driver1).get(urls[i])
      await driver1.wait(until.elementLocated(By.xpath('//*[@id="top-level-buttons"]/ytd-toggle-button-renderer[1]/a'), 500))
      let viewelement = await (await driver1.findElement(By.xpath('//*[@id="count"]/yt-view-count-renderer/span[1]'))).getText()
      let likeelement = await ((await driver1.findElement(By.xpath('//*[@id="top-level-buttons"]/ytd-toggle-button-renderer[1]/a')))).getText()
      let dislikeelement = await ((await driver1.findElement(By.xpath('//*[@id="top-level-buttons"]/ytd-toggle-button-renderer[2]/a')))).getText()
      let viewcount = numeral(viewelement.toLowerCase()).value()
      let likecount = numeral(likeelement.toLowerCase()).value()
      if (viewcount === 0 || likecount === 0) {
        coefficient[i] = 0
        await driver1.quit()

      } else {
        let dislikecount = numeral(dislikeelement.toLowerCase()).value()
        let qualitycoefficient = (likecount / viewcount) * (likecount / (likecount + dislikecount))
        coefficient[i] = qualitycoefficient
        await driver1.quit()

      }
    }

  }

  async function getBestVid() {
    var indexOfMaxValue = await coefficient.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    bestvideo = urls[indexOfMaxValue]

  }


  (await driver).quit
  return bestvideo
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});