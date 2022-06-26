const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MobileSchema = new Schema({
    title: String,
    img:String,
    price: String,
    description: String,
    
});

module.exports = mongoose.model('Mobile', MobileSchema);