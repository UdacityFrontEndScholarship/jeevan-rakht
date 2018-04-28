const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserAcct = require('./user');

const TokenSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'UserAcct' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 3600 }
});

var Token = mongoose.model('token', TokenSchema);

module.exports = Token;