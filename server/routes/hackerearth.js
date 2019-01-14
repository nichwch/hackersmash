const $ = require("jquery");
const ncp = require("copy-paste");
const puppeteer = require('puppeteer');
const username = "nichwch@gmail.com";
const password = "SamplePassword123";

async function headlessWrite(code,url) {
  // {headless: false}
  // console.log("hello");
  let browser = await puppeteer.launch({headless:false});
  let page = await browser.newPage();
  await page.goto(url);

  await page.click('#auth-login');
  await page.type('#input-4', username);
  await page.type('#input-5', password);
  await page.click('.auth-button');
  await page.waitFor(1000);
  await page.click('.Select-value');
  for(var i = 0;i<22;i++)
  {
    await page.click('.Select-value-label');
    await page.click('#react-select-2--option-'+i).catch(err=>{
      console.log(err);
    });
    var curr = await page.$('.Select-value-label');
    var textContent = await page.evaluate(() => document.querySelector('.Select-value-label').textContent);
    if(textContent=="JavaScript (Node.js)")
    {

      break;
    }
  }
  // await page.type('.inputarea',code);



  // await page.focus('.inputarea');
  // await page.keyboard.down('Control');
  // await page.keyboard.press('V');

  await page.type('.inputarea',"1");
  // await page.keyboard.down('Control');
  await page.keyboard.down('Meta');
  await page.keyboard.press('A');
  // await page.keyboard.up('Control');
  await page.keyboard.up('Meta');
  await page.keyboard.press('Backspace');
  code = code.replace(/(\r\n\t|\n|\r\t)/gm, "");
  console.log(code);
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
  // await page.waitFor(2000);
  await page.waitForSelector("p.status",{ timeout: 5000, visible: false})
  .catch(async (err)=>{
    console.log("something went wrong");
    return "our bad..."
  });
  const error = await page.$(".compile-error");
  const success = await page.$(".compile-success");
  // await browser.close();
  if(success!=null)
  {
    return "success";

  }
  else if(error != null)
  {
    return "error";
  }
  return "our bad...";






}

async function headlessScrape(pageToScrape)
{
    console.log("pagetoscrap"+pageToScrape);
  let browser = await puppeteer.launch();
  console.log("1");
  let page = await browser.newPage();
   console.log("2");
  await page.goto(pageToScrape);
  console.log("3");


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
