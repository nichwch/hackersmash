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
    playerOne:{
        name:{
            type: String,
            default:""
        },
        score:{
            type: Number,
            default:0
        }

    },
    playerTwo:{
        name:{
            type: String,
            default:""
        },
        score:{
            type: Number,
            default:0
        }

    },
    questions:{
        type: Array,
        default:[]
    }

});
module.exports = mongoose.model('Kahootroom', RoomShema);
