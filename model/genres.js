const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    name:{
        type :String,
        require: true,
        minlength: 3,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre',genresSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().minlength(5).maxlength(50).required(),
    };
    
    return Joi.validate(genre,schema);
}

module.exports.Genre = Genre;
module.exports.genresSchema = genresSchema;
// module.exports = validateGenre;