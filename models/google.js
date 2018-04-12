const mongoose = require('mongoose');

const oauthSchema = mongoose.Schema({
   username: String,
   googleId: String
});

module.exports = mongoose.model('Google', oauthSchema);