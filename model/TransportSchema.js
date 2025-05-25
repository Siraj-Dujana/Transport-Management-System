const mongoose = require('mongoose')


let transportSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true

    },
    transportName: {
        type: String,
        required: true,
        trim: true
    },
    transporterName: {
        type: String,
        required: true,
        trim: true
    },
    pCell: {
        type: String,
        trim: true
    },
    sCell: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports=mongoose.model("transport",transportSchema);

