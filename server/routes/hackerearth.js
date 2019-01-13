const $ = require("jquery");
const ncp = require("copy-paste");
const puppeteer = require('puppeteer');
const username = "nichwch@gmail.com";
const password = "SamplePassword123";

async function headlessWrite(code) {
  // {headless: false}
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto('https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays');

  await page.click('#auth-login');
  await page.type('#input-4', username);
  await page.type('#input-5', password);
  await page.click('.auth-button');
  await page.waitFor(1000);
  await page.click('.Select-value');
  await page.click('#react-select-2--option-10');
  // await page.type('.inputarea',code);



  // await page.focus('.inputarea');
  // await page.keyboard.down('Control');
  // await page.keyboard.press('V');

  await page.type('.inputarea',"1");
  await page.keyboard.down('Meta');
  await page.keyboard.press('A');
  await page.keyboard.up('Meta');
  await page.keyboard.press('Backspace');

  // attempt 2, currently best attempt
  for (let i = 0;i<code.length;i++)
  {
    if(code[i]=="{")
    {
      await page.type('.inputarea',code[i]);
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Backspace');
    }
    else if(code[i]=="(")
    {
      await page.type('.inputarea',code[i]);
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Backspace');
    }
    else if(code[i]=="[")
    {
      await page.type('.inputarea',code[i]);
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Backspace');
    }
    else{
      await page.type('.inputarea',code[i]);
    }

  };
  await page.click('.hr-monaco-compile');
  await page.waitFor(2000);
  const error = await page.$(".compile-error");
  const success = await page.$(".compile-success");
  if(error != null)
  {
    console.log("error");
    return "error";
  }
  else if(success!=null)
  {
    console.log("success");
    return "success";
  }
  else {
    console.log("something went wrong");
    return "our bad..."
  }




  // await browser.close();
}

async function headlessScrape(pageToScrape)
{
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(pageToScrape);

  const hrefs = await page.$$eval('#pdf-link', as => as.map(a => a.href));
  console.log(hrefs);
  return(hrefs[0]);


}

var router = require('express').Router();
router.post('/compile', function(req, res) {
  var source = req.body.toCompile;
  headlessWrite(source).then(resp =>{
    res.send(resp);
  });

});

router.post('/problem', function(req, res) {
  var source = req.body.problemLink;
  headlessScrape(source).then(resp =>{
    console.log(resp);
    res.send(resp);
  });
});

module.exports = router;
