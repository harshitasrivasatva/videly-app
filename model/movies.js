const mongoose = require('mongoose');
const { genresSchema , Genre} = require('./genres');

const movieSchema = new mongoose.Schema({
    title :{
        type :String,
        required :true  
    },
    genres :{
        // type : mongoose.Schema.Types.ObjectId,
        // ref : 'Genre',
        type :genresSchema,
        required :true
    },
    numberInStock :{
        type :Number,
        min  :0,
        max  :255
    },
    dailyRentalRate :{
        type :Number,
        min  :0
    }
});

const Movies = mongoose.model('Movies',movieSchema);

module.exports.Movies =Movies;