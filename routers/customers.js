const express =require('express');
const mongoose = require('mongoose');
const router =express.Router();
const { Custmors } = require('../model/customers');


router.get('/',async (req,res) => {

    const custmor = await Custmors.find();
    res.send(custmor);
})

router.get('/:id',async (req,res) => {

    const custmor = await Custmors.findById(req.params.id);
    if(!custmor) return res.send("Custmor with this ID doesn't Exist");

    res.send(custmor);
})

router.post('/',async (req,res) => {

    let custmor = new Custmors({
        name   :req.body.name,
        isGold :req.body.isGold,
        phone  :req.body.phone
    });

    try{
        custmor = await custmor.save();
        res.send(custmor);
    }
    catch(err){
        res.send(err.message); 
    }
    
})

router.put('/:id',async (req,res) => {
    
    let custmor = await Custmors.findByIdAndUpdate(req.params.id,{
        name   :req.body.name,
        isGold :req.body.isGold,
        phone  :req.body.phone
    },{ new :true});

    try{
        res.send(custmor);
    }
    catch(err){
        res.send(err.message); 
    }
})

router.delete('/:id',async (req,res) => {
    let custmor = await Custmors.findByIdAndRemove(req.params.id);
    if(!custmor) return res.send("Custmor with this ID doesn't Exist");

    try{
        res.send(custmor);
    }
    catch(err){
        res.send(err); 
    }
})

module.exports = router;