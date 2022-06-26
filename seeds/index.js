const mongoose = require('mongoose');
const products = require('./products');
const product_categories = require('./product_categories');
const categories = require('./categories');
const Mobile = require('../models/mobile');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// const sample = array => array[Math.floor(Math.random() * array.length)];


for(let i=0;i<11;i++){
    console.log(categories[i].name);
}

const seedDB = async () => {
    await Mobile.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const mob = new Mobile({
            title: `${products[random1000]}`,
            image:`${image_url[random1000]}`,
            price: `${price[random1000]}`,
            description: `${products[random1000]}`

        })
        await mob.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})