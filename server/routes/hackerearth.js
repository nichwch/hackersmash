const $ = require("jquery");
const ncp = require("copy-paste");
const puppeteer = require('puppeteer');
const username = "nichwch@gmail.com";
const password = "SamplePassword123";

async function headlessWrite(code,url) {
  // {headless: false}
  // console.log("hello");
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(url);

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
  console.log(code);
  console.log("^CODE++++++++++++++");
  // attempt 2, currently best attempt
  for (let i = 0;i<code.length;i++)
  {
    // await page.waitFor(10);
    process.stdout.write(i);
    console.log(code[i]);
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
  // await page.waitFor(2000);
  await page.waitForSelector("p.status",{ timeout: 5000, visible: false})
  .catch(async (err)=>{
    console.log("something went wrong");
    return "our bad..."
  });
  const error = await page.$(".compile-error");
  const success = await page.$(".compile-success");
  await browser.close();
  if(success!=null)
  {
    return "success";

  }
  else if(error != null)
  {
    return "enderror";
  }
  return "our bad...";






}

async function headlessScrape(pageToScrape)
{
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(pageToScrape);

  const hrefs = await page.$$eval('#pdf-link', as => as.map(a => a.href));
  console.log(hrefs);
  await browser.close();
  return(hrefs[0]);



}

var router = require('express').Router();
router.post('/compile', function(req, res) {
  var source = req.body.toCompile;
  var urrl = req.body.problemLink;
  console.log(urrl);
  headlessWrite(source,urrl).then(resp =>{
    console.log("resp"+resp);
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
