var router = require('express').Router();
const Kahootroom = require('../models/Kahootroom');
router.get('/', function(req, res) {
    console.log("entered");
    var match = true;
    var short = Math.random().toString(36).substring(7).toUpperCase();

    do {
        console.log("in the loop");

        Kahootroom.find({
            shortenedId: short
        }, function(err, result) {
            if(err){
                console.log(err);
            }
            console.log(result);
            if (result.length == 0) {
                match = false;
            }
        })
    } while (!match);
    room = new Kahootroom();
    room.shortenedId = short;
    room.status = 'awaiting';
    room.save((err, successs) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'Error'
            })
        }
        res.json(room);
    })



})
module.exports = router;
