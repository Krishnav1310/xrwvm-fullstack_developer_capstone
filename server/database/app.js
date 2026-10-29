const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

const path = require('path');

const reviewsFile = fs.existsSync(path.join(__dirname, "data", "reviews.json"))
  ? path.join(__dirname, "data", "reviews.json")
  : path.join(__dirname, "reviews.json");
const dealershipsFile = fs.existsSync(path.join(__dirname, "data", "dealerships.json"))
  ? path.join(__dirname, "data", "dealerships.json")
  : path.join(__dirname, "dealerships.json");

const reviews_data = JSON.parse(fs.readFileSync(reviewsFile, 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync(dealershipsFile, 'utf8'));

let isMongoConnected = false;
mongoose.connect("mongodb://mongo_db:27017/", { 'dbName': 'dealershipsDB' })
  .then(() => {
    isMongoConnected = true;
    try {
      Reviews.deleteMany({}).then(() => {
        Reviews.insertMany(reviews_data['reviews']);
      });
      Dealerships.deleteMany({}).then(() => {
        Dealerships.insertMany(dealerships_data['dealerships']);
      });
    } catch (error) {
      console.log('Error initializing Mongo collections:', error);
    }
  })
  .catch((err) => {
    console.log("MongoDB connection offline, serving from local JSON:", err.message);
    isMongoConnected = false;
  });

const Reviews = require('./review');
const Dealerships = require('./dealership');

// Express route to home
app.get('/', async (req, res) => {
  res.send("Welcome to the Mongoose API");
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    if (isMongoConnected) {
      const documents = await Reviews.find();
      return res.json(documents);
    }
    res.json(reviews_data['reviews']);
  } catch (error) {
    res.json(reviews_data['reviews']);
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const documents = await Reviews.find({ dealership: req.params.id });
      return res.json(documents);
    }
    const docs = reviews_data['reviews'].filter(r => String(r.dealership) === String(req.params.id));
    res.json(docs);
  } catch (error) {
    const docs = reviews_data['reviews'].filter(r => String(r.dealership) === String(req.params.id));
    res.json(docs);
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    if (isMongoConnected) {
      const documents = await Dealerships.find();
      return res.json(documents);
    }
    res.json(dealerships_data['dealerships']);
  } catch (error) {
    res.json(dealerships_data['dealerships']);
  }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    if (isMongoConnected) {
      const documents = await Dealerships.find({ state: req.params.state });
      return res.json(documents);
    }
    const docs = dealerships_data['dealerships'].filter(d => d.state.toLowerCase() === req.params.state.toLowerCase());
    res.json(docs);
  } catch (error) {
    const docs = dealerships_data['dealerships'].filter(d => d.state.toLowerCase() === req.params.state.toLowerCase());
    res.json(docs);
  }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const documents = await Dealerships.find({ id: req.params.id });
      return res.json(documents);
    }
    const docs = dealerships_data['dealerships'].filter(d => String(d.id) === String(req.params.id));
    res.json(docs);
  } catch (error) {
    const docs = dealerships_data['dealerships'].filter(d => String(d.id) === String(req.params.id));
    res.json(docs);
  }
});

// Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  const data = JSON.parse(req.body);
  if (isMongoConnected) {
    try {
      const documents = await Reviews.find().sort({ id: -1 });
      let new_id = documents.length > 0 ? documents[0]['id'] + 1 : 1;

      const review = new Reviews({
        "id": new_id,
        "name": data['name'],
        "dealership": data['dealership'],
        "review": data['review'],
        "purchase": data['purchase'],
        "purchase_date": data['purchase_date'],
        "car_make": data['car_make'],
        "car_model": data['car_model'],
        "car_year": data['car_year'],
      });

      const savedReview = await review.save();
      return res.json(savedReview);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error inserting review' });
    }
  }

  const existingReviews = reviews_data['reviews'];
  let new_id = existingReviews.length > 0 ? Math.max(...existingReviews.map(r => r.id)) + 1 : 1;
  const newReview = {
    id: new_id,
    name: data.name,
    dealership: data.dealership,
    review: data.review,
    purchase: data.purchase,
    purchase_date: data.purchase_date,
    car_make: data.car_make,
    car_model: data.car_model,
    car_year: data.car_year
  };
  existingReviews.push(newReview);
  res.json(newReview);
});

// Start the Express server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
