const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name :{
        type :String,
        required :true
    },
    phone :{
        type :Number,
        required :true,
        minlength :10
    },
    isGold :{
        type :Boolean,
        required :true
    }
});

const Custmors = mongoose.model('Customers',customerSchema);

module.exports.Custmors = Custmors;