/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

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

const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8');

const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
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
