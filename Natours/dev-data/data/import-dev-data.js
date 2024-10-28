/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: 'config.env' });

console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error(err);
  });

//Read Json File

const tours = fs.readFileSync(`${__dirname}/tours.json`, 'utf8');
const users = fs.readFileSync(`${__dirname}/users.json`, 'utf8');
const reviews = fs.readFileSync(`${__dirname}/reviews.json`, 'utf8');

const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    await User.create(JSON.parse(users), { validateBeforeSave: false });
    await Review.create(JSON.parse(reviews));
    console.log('Data imported successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
console.log(process.argv);
if (process.argv[2] === '---import') {
  importData();
} else if (process.argv[2] === '---delete') {
  deleteData();
} else {
  console.log('Please specify --import or --delete');
}
