var router = require('express').Router();
const Kahootroom = require('../models/Kahootroom');
router.post('/', function(req, res) {
    var updateField = req.body.player+'.score'
    if(req.body.player ==="playerOne"){
    Kahootroom.update({shortenedId:req.body.id.toUpperCase()},
    {$inc:{"playerOne.score":req.body.amount}},
    function(err,result){
        if(err){
            console.log(err)
            res.json({success: "false"})
        }
        else{
            res.json({success:"true"})
            console.log(result)
        }
    })
}
else{
    Kahootroom.update({shortenedId:req.body.id.toUpperCase()},
    {$inc:{"playerTwo.score":req.body.amount}},
    function(err,result){
        if(err){
            console.log(err)
            res.json({success: "false"})
        }
        else{
            res.json({success:"true"})
            console.log(result)
        }
    })
}



})
module.exports = router;
