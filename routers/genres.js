const mongoose   = require('mongoose');
const express    = require('express');
const router     = express.Router();
const { Genre }  = require('../model/genres');
const auth       = require('../middleware/auth');
const admin      = require('../middleware/admin');


/* #### getting data #### */

router.get('/',async (req,res,next) => {
    try{
        const genres =await Genre.find();
        res.send(genres);
    }
    catch(err){
        next(err);
    }
})

/* #### getting data by ID #### */

router.get('/:id',async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
       return res.status(404).send("Invalid Id");

    let genre = await Genre.findById({_id :req.params.id});
    if(!genre) return res.send('The given ID is not present');

    res.send(genre);
})


/* #### posting data #### */

router.post('/',auth,async (req,res) => {
    console.log(req.body);

    if(!req.body.name || req.body.name.length<3)
      return res.status(401).send('Name is required and minimum of length 3');

    let genres = new Genre({ name :req.body.name });

    genre = await genres.save();
    res.send(genre);
});

/* #### updating data #### */

router.put('/:id',async (req,res) => {
    if(!req.body.name || req.body.name.length<3)
        return res.status(400).send('Name is required and minimum of length 3');

    let genre = await Genre.findByIdAndUpdate(req.params.id, {  name :req.body.name },{  new :true} );

    if(!genre) return res.send('The given ID is not present');    

    res.send(genre);
});

/* #### deliting data #### */

router.delete('/:id',[auth], async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.send('The given ID is not present');    

    res.send(genre);
})

// function validateGenre(genre) {
//     const schema = {
//         name: Joi.string().minlength(5).maxlength(50).required(),
//     };

//     return Joi.validate(genre,schema);
// }

module.exports = router;
// module.exports = validateGenre;