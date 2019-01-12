var router = require('express').Router();
const Kahootroom = require('../models/Kahootroom');
router.get('/', function(req, res) {
    Kahootroom.findOneAndUpdate({shortenedId:req.query.id.toUpperCase()},{status:'playing'},
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
