const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MobileSchema = new Schema({
    title: String,
    img:String,
    // price: Number,
    // description: String,
    
});

module.exports = mongoose.model('Mobile', MobileSchema);