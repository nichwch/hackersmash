var hackerEarth=require('hackerearth-node'); //require the Library
//Now set your application
var hackerEarth=new hackerEarth(
                                '**********',  //Your Client Secret Key here this is mandatory
                                ''  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
);
var config={};
config.time_limit=1;  //your time limit in integer
config.memory_limit=323244;  //your memory limit in integer
config.source='';  //your source code for which you want to use hackerEarth api
config.input="";  //input against which you have to test your source code
config.language="C/C++/Py/C#"; //optional choose any one of them or none


var router = require('express').Router();
router.post('/hackerEarth', function(req, res) {
  console.log(req.body);
  // hackerEarth.compile(config,function(err,response){
  //     if(err) {
  //       //deal with error
  //     } else {
  //       //deal with response
  //     }
  // });
  res.send("hello");
})
module.exports = router;
