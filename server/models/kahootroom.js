const mongoose = require('mongoose');
const RoomShema = new mongoose.Schema({
    status: {
        type: String,
        default: ''
    },
    people:{
        type: Array,
        default: []
    },

});
module.exports = mongoose.model('Kahootroom', RoomShema);
