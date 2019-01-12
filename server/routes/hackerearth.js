const $ = require("jquery");
const ncp = require("copy-paste");
const puppeteer = require('puppeteer');
const username = "nichwch@gmail.com";
const password = "SamplePassword123";

async function headlessWrite(code) {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays');

  await page.click('#auth-login');
  await page.type('#input-4', username);
  await page.type('#input-5', password);
  await page.click('.auth-button');
  await page.waitFor(1000);
  await page.click('.Select-value');
  await page.click('#react-select-2--option-10');
  // await page.type('.inputarea',code);

  // //attempt 3:
  // await ncp.copy('some text');
  // await page.type('.inputarea',"1");
  // await page.focus('.inputarea');
  // await page.keyboard.down('Control');
  // await page.keyboard.press('V');

  await page.keyboard.down('Meta');
  await page.keyboard.press('A');
  await page.keyboard.up('Meta');
  await page.keyboard.press('Backspace');

  // // attempt 1:
  // var newCode = "";
  // for(var i = 0;i<code.length;i++)
  // {
  //   if(code[i]=="}"&&code[i]==")"&&code[i]=="]")
  //   {
  //     i++;
  //   }
  //   else
  //   {
  //     newCode = newCode.concat(code[i]);
  //   }
  // }
  // console.log(newCode);
  // await page.type('.inputarea',newCode);

  //attempt 2, currently best attempt
  for (var i = 0;i<code.length;i++)
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
  const element = await page.$(".lol");
  console.log(element);




  // await browser.close();
}


var router = require('express').Router();
router.post('/compile', function(req, res) {
  console.log(req.body.toCompile);
  var source = req.body.toCompile;
  headlessWrite(source);
  });

module.exports = router;
