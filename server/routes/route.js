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

router.get("/Circos", async (req, res) => {
    try {
        // Fetch all data from the ligands collection
        const ligandData = await ligands.find().exec();

        const ligandNames = [...new Set(ligandData.map(doc => doc.ligand))];
        const receptorNames = [...new Set(ligandData.map(doc => doc.receptor))];

        const allEntities = [...ligandNames, ...receptorNames];

        const totalSegments = allEntities.length;
        const segmentAngle = 360 / totalSegments; 

        const layoutData = allEntities.map((item, idx) => {
            const startAngle = idx * segmentAngle;
            const endAngle = (idx + 1) * segmentAngle;
            return {
                id: item,
                label: item,
                color: ligandNames.includes(item) ? 'red' : 'blue',
                start: startAngle,
                end: endAngle
            };
        });

        const links = ligandData.map(doc => {
            return {
                source: doc.ligand,
                target: doc.receptor,
                thickness: 1,
                color: "#f00"
            }
        });

        console.log(layoutData);

        res.json(layoutData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred fetching ligand-receptor data" });
    }
});
 

//route for circos graph
router.get('/getImage', (req, res) => {
    const imgPath = 'C:/Users/Yuqi/Documents/circos/circos_plot.png';
    res.sendFile(path.resolve(imgPath));
});

module.exports = router;