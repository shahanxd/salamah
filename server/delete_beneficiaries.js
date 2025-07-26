const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Beneficiary = require('./models/Beneficiary');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Beneficiary.deleteMany({});
    console.log('All Beneficiaries deleted');
    mongoose.disconnect();
  })
  .catch(console.error);
