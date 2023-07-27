const mongoose = require('mongoose');
const uploadSchema = new mongoose.Schema({
    photo:{
        type: String,
        require:true,
    },
    desc:{
        type: String,
        require: true,
    },
}, {timestamps:true});

module.exports =mongoose.model('upload', uploadSchema)