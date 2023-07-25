const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    id: {
        type : String,
        required : true,
    },
    name: {
        type : String,
        required : true,
    },
    destination: {
        type : String,
        required : true,
    },
    date:{
        type : String,
        required : true,
    },
    activities :[
        {
            name :{
                type : String,
                required : true,
            },
            location:{
                type : String,
                required : true,
            },
            time : {
                type : String,
                required : true,
            },
        }
    ],
    completed :{
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model('Itinerary',itinerarySchema);
