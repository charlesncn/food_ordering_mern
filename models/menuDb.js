const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    dishname:{
        type: String,
        required: true
    },
    dishdesc:{
        type: String,
        required: true
    },
    dishprice:{
        type: Number,
        required: true
    },
    dishcategory:{
        type: String,
        // required: true
    },
    img:{
        type: String,
        // default:"default.png"
        required: false
    }
})

module.exports = mongoose.model('Menu', menuSchema)