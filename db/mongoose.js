const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/jeevan_rakht').then(() => {
    console.log('Connected');
}, (err) => {
    console.error('Error', err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;