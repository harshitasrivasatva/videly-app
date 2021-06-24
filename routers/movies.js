const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Movies } = require('../model/movies');
const { Genre } = require('../model/genres');


/* #### getting data #### */

router.get('/',async (req,res) => {
    const movie =await Movies.find();
    res.send(movie);
})

/* #### getting data by ID #### */

router.get('/:id',async (req,res) => {
    let movie = await Movies.findById({_id :req.params.id});
    if(!movie) return res.send('The given ID is not present');

    res.send(movie);
})


/* #### posting data #### */

router.post('/',async (req,res) => {
    let genre = await Genre.findById(req.body.genreId);  

    let movie = new Movies({ 
        title :req.body.title,
        genres :{
            _id : genre._id,
            name: genre.name
        },
        numberInStock :req.body.numberInStock,
        dailyRentalRate  :req.body.dailyRentalRate 
    });

    movie = await movie.save();
    res.send(movie);
});

/* #### updating data #### */

router.put('/:id',async (req,res) => {
    let movie = await Genre.findByIdAndUpdate(
        req.params.id, 
        {
            title :req.body.title,
            numberInStock :req.body.numberInStock,
            dailyRentalRate  :req.body.dailyRentalRate 
        },
        {  
           new :true
        } 
    );

    res.send(movie);
});

/* #### deliting data #### */

router.delete('/:id',async (req,res) => {
    const movie = await Movies.findByIdAndRemove(req.params.id);
    if(!movie) return res.send('The given ID is not present');    

    res.send(movie);
})

module.exports = router;