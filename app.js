const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Mobile = require('./models/mobile');

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//Home Page
app.get('/', (req, res) => {
    res.render('home')
});

//List all categories
app.get('/mobiles', async (req,res) => {
    const mobiles = await Mobile.find({});
    res.render('mobiles/index', { mobiles })
});

//List products belonging to a specific category_id.
app.get('/mobiles/new', (req, res) => {
    res.render('mobiles/new');
})


//Post a new mobile
app.post('/mobiles', async (req, res) => {
    const mobile = new Mobile(req.body.mobile);
    await mobile.save();
    res.redirect(`/mobiles/${mobile._id}`)
})


//Display information about a product.
app.get('/mobiles/:id', async (req, res,) => {
    const mobile = await Mobile.findById(req.params.id)
    res.render('mobiles/show', { mobile });
});


//Edit the mobile
app.get('/mobiles/:id/edit', async (req, res) => {
    const mobile = await Mobile.findById(req.params.id)
    res.render('mobiles/edit', { mobile });
})


//Update an item in the cart. Endpoint
//should accept product_id and quantity as input.
app.put('/mobiles/:id', async (req, res) => {
    const { id } = req.params;
    const mobile = await Mobile.findByIdAndUpdate(id, { ...req.body.mobile });
    res.redirect(`/mobiles/${mobile._id}`)
});


//Delete an item from the cart. 
//Endpoint should accept product_id as input.
app.delete('/mobiles/:id', async (req, res) => {
    const { id } = req.params;
    await Mobile.findByIdAndDelete(id);
    res.redirect('/mobiles');
})



app.listen(3000, () => {
    console.log('Serving on port 3000')
})