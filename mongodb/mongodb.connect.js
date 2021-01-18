const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://aradtaut:122333@cluster0.xxall.mongodb.net/Todo?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log('Connected to MongoDb');
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };
