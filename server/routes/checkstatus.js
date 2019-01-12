var router = require('express').Router();
const Kahootroom = require('../models/Kahootroom');
router.get('/', function(req, res) {
    Kahootroom.findOne({shortenedId:req.query.id.toUpperCase()},
    function(err,result){
        if(err){
            res.json({joined: "false"})
        }
        else if (result.status === 'playing'){
            res.json({success:"true"})
        }
        else{
            res.json({success:"false"})
        }
    })



})
module.exports = router;
