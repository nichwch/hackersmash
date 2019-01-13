var router = require('express').Router();
const Kahootroom = require('../models/Kahootroom');
router.get('/', function(req, res) {
    Kahootroom.findOne({shortenedId:req.query.id.toUpperCase()},
    function(err,result){
        if(err){
            res.json({success: "false"})
        }


        else{
            res.json(result);
        }
    })



})
module.exports = router;
