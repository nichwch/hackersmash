var router = require('express').Router();
const Kahootroom = require('../models/Kahootroom');
router.post('/', function(req, res) {
    Kahootroom.findOneAndUpdate({shortenedId:req.body.id.toUpperCase()},{status:'playing',playerTwo:{name:req.body.name,score:0}},
    function(err,result){
        if(err){
            res.json({success: "false"})
        }
        else{
            res.json({success:"true"})
        }
    })



})
module.exports = router;
