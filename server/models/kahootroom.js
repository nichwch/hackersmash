const mongoose = require('mongoose');
const RoomShema = new mongoose.Schema({
    status: {
        type: String,
        default: ''
    },
    shortenedId:{
        type: String,
        default: ''
    },

});
module.exports = mongoose.model('Kahootroom', RoomShema);
