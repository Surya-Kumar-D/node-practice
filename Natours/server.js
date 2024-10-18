/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log('Connected to the database');
});

const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('Server is running on port 3000');
});

// TEST
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandler Rejection! 💣 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('unhandler Execption! 💣 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
