const puppeteer = require('puppeteer')
var random_useragent = require('random-useragent');

async function main() {
  try {

    const browser = await puppeteer.launch({ slowMo: 50, headless: false })

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


    await page.waitForNavigation({timeout:100000});
    await page.waitForSelector('#ember41 input', { timeout: 100000 })
    await page.type('#ember41 input', 'F & B')

   

    await page.keyboard.press('Enter');
    await page.waitForNavigation({waitUntil:'networkidle2'})

    await page.waitForSelector('.blended-srp-results-js', { timeout: 100000 })

    const buttonCollections = await page.$$('.search-vertical-filter__filter-item-button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--tertiary.ember-view')
    const peopleButton = buttonCollections[0];
    await peopleButton.click()
    await page.waitForNavigation({timeout:100000});

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
  // await autoScroll(page);
    // await browser.close()
    await page.waitForSelector('.search-s-facet__button.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--2.artdeco-button--secondary.ember-view')
    const buttonsArrays = await page.$$('.search-s-facet__button.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--2.artdeco-button--secondary.ember-view')
    buttonsArrays[0].click();
    await page.waitForSelector('.search-s-facet-value__input');
    const inputArray= await page.$$('.search-s-facet-value__input');
    const firstConn= inputArray[0]
    await page.evaluate((element)=>{
       element.click();
    },firstConn)
     
    const applyFilter = await page.$$('.facet-collection-list__apply-button.ml2.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view')
    applyFilter[0].click()

    await page.waitForNavigation();

    await autoScroll(page);



  //  let cont= true;
  //  while(cont){
  //   const msgButtons= await page.$$('.message-anywhere-button.search-result__actions--primary.artdeco-button.artdeco-button--default.artdeco-button--2.artdeco-button--secondary')
  //   for(const button of msgButtons){
        
  //       button.click();
  //       console.log("clicked to popen new window ");
  //       await page .waitForSelector('.msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.notranslate')
  //       const inputMessage= await page.$('.msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.notranslate')
  //       // await inputMessage.type("Hello I am a bot");
  //       // await inputMessage.type("");
    
  //     //  await page.waitForSelector(".msg-form__send-button.artdeco-button.artdeco-button--1");
  //       const sendMesgButton = await page.$('.msg-form__send-button.artdeco-button.artdeco-button--1')
  //       await page.waitForSelector('.msg-overlay-bubble-header__control.js-msg-close.artdeco-button.artdeco-button--circle.artdeco-button--inverse.artdeco-button--1.artdeco-button--tertiary.ember-view',{timeout:1000000})
  //       const closeWindowButton = await page.$('.msg-overlay-bubble-header__control.js-msg-close.artdeco-button.artdeco-button--circle.artdeco-button--inverse.artdeco-button--1.artdeco-button--tertiary.ember-view')
  //       closeWindowButton.click();
  //       console.log("close is clicked");
  //       await autoScroll(page);
  //   }
    
  //   console.log("clcicked all connections here");
  //   await autoScroll(page);
  //   let nextButton =await page.$('.artdeco-pagination__button.artdeco-pagination__button--next.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--1.artdeco-button--tertiary.ember-view')
  //   let { _remoteObject }= await nextButton.getProperty('disabled');
  //   console.log(_remoteObject)
  //   if(!_remoteObject.value){
  //     nextButton.click();
  //     await page.waitForNavigation();
  //     console.log("clcicked")
  //   }else{
  //     cont=false;
  //     console.log("No clcick")
  //   }
  //   await autoScroll(page);
  //  }

    
    
   

  } catch (error) {
    console.log("there");
    console.log(error)
    // await page.waitForSelector('#Expertresults',{timeout:5000}); 
  }
}
main();