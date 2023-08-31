const ligands = require('../models/ligandModel');
const express = require('express');
const router = express.Router();
const path = require('path')


router.get("/", async(req, res) =>{
    try{
        const ligandName = "Spp1";

        if(!ligandName){
            return res.status(400).json({ error: "No name query found inside request" });
        }

        const ligandsFound = await ligands.find({ ligand: ligandName }).exec();
        if (ligandsFound.length === 0) {
            return res.status(404).json({ message: "No ligands found with the specified name" });
        }

        res.json(ligandsFound);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
}); 

router.get("/FindByLigand", async(req, res) =>{
    try{
        const ligandName = req.query.name;

        if(!ligandName){
            return res.status(400).json({ error: "No name query found inside request" });
        }

        const ligandsFound = await ligands.find({ ligand: ligandName }).exec();
        if (ligandsFound.length === 0) {
            return res.status(404).json({ message: "No ligands found with the specified name" });
        }

        res.json(ligandsFound);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
}); 

module.exports = router;