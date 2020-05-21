const puppeteer = require('puppeteer')
var random_useragent = require('random-useragent');

async function main() {
  try {

    const browser = await puppeteer.launch({ slowMo: 70, headless: false })

    //const browser = await puppeteer.launch( { headless:false, args: [ "--no-sandbox", "--headless", "--disable-gpu", "--window-size=1920x1080" ] } )
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 700 })
    // console.log(userAgent.toString())var userAgent = require('user-agents');
    //page.setUserAgent(userAgent.toString());
    const ua = random_useragent.getRandom();
    console.log(ua);
    page.setUserAgent(ua);
    await page.goto('https://www.linkedin.com/feed/')
    await page.waitForSelector('.main__sign-in-link', { timeout: 5000 })
    //console.log(a);
    const href = await page.$('.main__sign-in-link')
    // sections.click()
    const linkObject = await href.getProperty('href')
    const link = linkObject._remoteObject.value;
    //console.log(link)



    await page.goto(link)

    await page.type('#username', 'rish6696.rs@gmail.com');
    await page.type('#password', 'sharma78');

    const form = await page.$('.login__form');
    await form.evaluate(f => {
      f.submit();
    })


    await page.waitForNavigation();
    await page.waitForSelector('#ember41 input', { timeout: 100000 })
    await page.type('#ember41 input', 'apple')

    await page.keyboard.press('Enter');
    //   await page.waitForNavigation({waitUntil:'networkidle2'})

    await page.waitForSelector('.blended-srp-results-js', { timeout: 100000 })

    async function autoScroll(page) {
      await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      });
    }
   await autoScroll(page);

   let cont= true;
   while(cont){
    let  divArray = await page.$$('.search-result__actions');
    for (let d of divArray) {
      let button = await d.$('button');
      const text = await page.evaluate(element => element.textContent, button);
     // console.log(text.trim());
      const b = text.trim().localeCompare("Connect");
      //console.log(b);
      if (b == 0) {
        console.log("clcicking for " ,text.trim() )
        button.click();
        await page.waitForSelector('.ml1.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view', 10000)
        let conf = await page.$('.ml1.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view')
        conf.click();
        console.log("clicked for connection in main script");
        await autoScroll(page);
        divArray = await page.$$('.search-result__actions');
      }
    }
    console.log("clcicked all connections here");
    await autoScroll(page);
    let nextButton =await page.$('.artdeco-pagination__button.artdeco-pagination__button--next.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--1.artdeco-button--tertiary.ember-view')
    let { _remoteObject }= await nextButton.getProperty('disabled');
    console.log(_remoteObject)
    if(!_remoteObject.value){
      nextButton.click();
      await page.waitForNavigation();
      console.log("clcicked")
    }else{
      cont=false;
      console.log("No clcick")
    }
    await autoScroll(page);
   }


   console.log("task finished");
  
    // await browser.close()

  } catch (error) {
    console.log("there");
    console.log(error)
    // await page.waitForSelector('#Expertresults',{timeout:5000}); 
  }


}
main();