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

// Existing route: find by species
router.get("/FindBySpecies", async (req, res) => {
    try {
        const speciesType = req.query.species;

        if (!speciesType) {
            return res.status(400).json({ error: "No species query found inside request" });
        }

        const ligandsFound = await ligands.find({ "species.x": speciesType }).exec();
        if (ligandsFound.length === 0) {
            return res.status(404).json({ message: "No ligands found for the specified species" });
        }

        res.json(ligandsFound);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// New route: find by species and ligand name
router.get("/findBySpecies/findByLigand", async (req, res) => {
    try {
        const speciesType = req.query.species;
        const ligandName = req.query.name;

        if (!speciesType || !ligandName) {
            return res.status(400).json({ error: "Both species and ligand name queries must be provided" });
        }

        const ligandsFound = await ligands.find({ 
            "species.x": speciesType,
            "ligand": ligandName
        }).exec();

        if (ligandsFound.length === 0) {
            return res.status(404).json({ message: "No ligands found for the specified species and name" });
        }

        res.json(ligandsFound);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});
 

module.exports = router;