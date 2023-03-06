const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    catName: {
        type: String,
        required: true
    },
    catImg: {
        type: String,
        required: true
    },
    nickNames: {
        type: Array,
        required: true,
        default: []
    },
    clicks: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const CatModel = new mongoose.model("CatModel" , catSchema);

module.exports = CatModel