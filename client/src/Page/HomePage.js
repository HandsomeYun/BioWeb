import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Graph from 'react-graph-vis';
import '../style/HomePage.css';
import NeuroImage from "./asset/image.png";
import GlobalHeader from '../components/globalHeader'

function HomePage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSpecies, setSelectedSpecies] = useState('Human');
    const [graphDataSpp1, setGraphDataSpp1] = useState([]);
    const [graphDataEntpd1, setGraphDataIcam1] = useState([]);
    const [graphDataC3, setGraphDataFN1] = useState([]);


    const handleSelectionClick = () => {
        setIsFilterOpen(!isFilterOpen);
    };
    const handleOptionClick = (option) => {
        setSelectedSpecies(option);
        setIsFilterOpen(false);
    };

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            let capitalizedTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
            navigate(`/findBySpecies/findByLigand?species=${selectedSpecies}&name=${capitalizedTerm}`);
        }
    };
    const fetchGraphData = (term, species, setSpecificGraphData) => {
        const baseURL = `/api/findBySpecies/findByLigand?species=${species}&name=${term}`;
        fetch(baseURL)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const groupedByCell = {};
                    data.forEach(item => {
                        if (!groupedByCell[item.ligand_cell]) {
                            groupedByCell[item.ligand_cell] = [];
                        }
                        groupedByCell[item.ligand_cell].push(item);
                    });
    
                    const graphs = {};
                    Object.entries(groupedByCell).forEach(([cell, cellItems]) => {
                        const currentGraph = {
                            ligand_cell: cell,
                            nodes: [{
                                id: term, 
                                label: term, 
                                title: term, 
                                color: '#25d970', 
                                size: 50, 
                                font: {
                                    face: 'Arial',
                                    size: 55,
                                }
                            }],
                            edges: [],
                            receptorNodeIds: new Set(),
                            edgeSet: new Set()
                        };
    
                        cellItems.forEach(item => {
                            const { nodes, edges, receptorNodeIds, edgeSet } = currentGraph;
                            const edge1Str = `${item.ligand}->${item.receptor}`;
                            const edge2Str = `${item.receptor}->${item.receptor}-${item.receptor_cell}`;
                            const cellNodeId = `${item.receptor}-${item.receptor_cell}`;
    
                            if (item.ligand === term) {
                                if(item.FDR_Str_vs_Con.x !== undefined){
                                    nodes[0].title = `LogFC_Str_vs_Con.x: ${item.LogFC_Str_vs_Con.x} \nFDR_Str_vs_Con.x: ${item.FDR_Str_vs_Con.x}`;
                                } else {
                                    nodes[0].title = `LogFC_Str_vs_Con.x: ${item.LogFC_Str_vs_Con.x}`;
                                }
                            }
    
                            if (!receptorNodeIds.has(item.receptor)) {
                                nodes.push({ id: item.receptor, 
                                    label: item.receptor,  
                                    color: 'orange', 
                                    value: 10 });
                                receptorNodeIds.add(item.receptor);
                            }
    
                            if (!receptorNodeIds.has(cellNodeId)) {
                                let color;
                                switch(item.receptor_cell) {
                                    case 'Peri':
                                        color = '#77B300';
                                        break;
                                    case 'OPC':
                                        color = '#A9A9A9';
                                        break;
                                    case 'astrocyte':
                                        color = '#FFD700';
                                        break;
                                    case 'Micro':
                                        color = '#99BBFF';
                                        break;
                                    case 'EC':
                                        color = '#EE82EE';
                                        break;
                                    default:
                                        color = 'turquoise';
                                }
                                let title = '';
                                if(item.FDR_Str_vs_Con.y !== undefined){
                                    title = `LogFC_Str_vs_Con.y: ${item.LogFC_Str_vs_Con.y} \nFDR_Str_vs_Con.y: ${item.FDR_Str_vs_Con.y}`;
                                } else {
                                    title = `LogFC_Str_vs_Con.y: ${item.LogFC_Str_vs_Con.y}`;
                                }
                                nodes.push({ id: cellNodeId, 
                                    label: item.receptor_cell, 
                                    title: title, 
                                    color: color, 
                                    size: 20 });
                                receptorNodeIds.add(cellNodeId);
                            }
    
                            if (!edgeSet.has(edge1Str)) {
                                edges.push({ from: item.ligand, to: item.receptor, length: 250 });
                                edgeSet.add(edge1Str);
                            }
    
                            if (!edgeSet.has(edge2Str)) {
                                edges.push({ from: item.receptor, to: cellNodeId, length: 50 });
                                edgeSet.add(edge2Str);
                            }
                        });
    
                        graphs[cell] = currentGraph;
                    });
    
                    const graphArray = Object.values(graphs);
                    console.log("Generated graph data for", term, graphArray);  // Debugging line
                    setSpecificGraphData(graphArray);
                } else {
                    console.error("API response is not an array:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
                console.log("graph.data: ", graphDataC3);
            });
    }
    
    

    useEffect(() => {
        fetchGraphData("SPP1", "human", setGraphDataSpp1);
        fetchGraphData("Icam1", "mouse", setGraphDataIcam1);
        fetchGraphData("FN1", "human", setGraphDataFN1);
    }, []);

    const options = {            
        layout: {
            improvedLayout: true,
        },
        edges: {
            color: "#000000"
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -3000,
                centralGravity: 1,
                springLength: 25,
                springConstant: 0.1,
                damping: 0.83,
                avoidOverlap: 1
            }
        },
        interaction: {
            zoomView: false,
            dragView: false,
            hover: true
        },
        nodes: {
            shape: 'circle',
            scaling: {
                min: 10,
                max: 100,
                customScalingFunction: (min, max, total, value) => {
                    return value;  // Just return the value, effectively disabling scaling
                }
            },
            font: {
                size: 20,
                face: 'Tahoma',
                background: 'transparent', // Set a transparent background for the font
                strokeWidth: 0,  // No border around the text
                align: 'center'  // Center the text inside the node
            },
            chosen: { // Only include this if nothing else works
                node: function (values, id, selected, hovering) {
                    values.color = '#eb4634';  // or whatever logic you have for color
                    values.label = 'center'; // Force center alignment
                }
            }
        }
    };

    return (
        <>
            <div id="container">
                <div id="header">
                    <GlobalHeader page={{ text: 'home' }}/>
                </div>
                <div id="wrapper">
                    <div id="content">
                        <h1>Intercellular interactome in Vascular Dementia</h1>

                        {/* Here starts the Search Bar*/}
                        <ul>
                            <div className="box">
                                <form action="#" onSubmit={handleSearchSubmit}>
                                    <div className="input_box">
                                        <input
                                            type="text"
                                            className="search-bar"
                                            placeholder="Type to Search Ligands..."
                                            required
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className="selection" onClick={handleSelectionClick}>
                                            <p>{selectedSpecies ? selectedSpecies : "Species"}</p>
                                            <span></span>
                                        </div>
                                        {isFilterOpen && (
                                            <div className="categories active">
                                                <p className="option" onClick={() => handleOptionClick('Human')}>Human</p>
                                                <p className="option" onClick={() => handleOptionClick('Mouse')}>Mouse</p>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </ul>
                        <br />
                        {/* Search Bar Ends*/}

                        <h2>Reference</h2>
                        <p id="reference-text">
                            BioRxiv, DOI: https://doi.org/10.1101/2024.03.24.585301
                        </p>
                        <a href="https://doi.org/10.1101/2024.03.24.585301" class="button" target="_blank" rel="noopener noreferrer">
                            Learn More
                        </a>
                    </div>
                </div>
                <div id="navigation">
                    <img src={NeuroImage} alt="logo" />
                </div>
                <div id="extra">
                    <div id="card">
                        {graphDataEntpd1.length > 0 ? (
                            graphDataEntpd1
                            .filter(graph => graph.ligand_cell === "Peri")
                            .map((graph, index) => (
                                <div id="graph1" key={index}>
                                    <Graph graph={graph} options={options} />
                                </div>
                            ))
                        ) : (
                            <p>No ligands found with the specified name and species.</p>
                        )}
                    </div>
                    <div id="card">
                        {graphDataSpp1.length > 0 ? (
                            graphDataSpp1
                            .filter(graph => graph.ligand_cell === "OPC")
                            .map((graph, index) => (
                                <div id="graph1" key={index}>
                                    <Graph graph={graph} options={options} />
                                </div>
                            ))
                        ) : (
                            <p>No ligands found with the specified name and species.</p>
                        )}
                    </div>
                    <div id="card">
                        {graphDataC3.length > 0 ? (
                            graphDataC3
                            .filter(graph => graph.ligand_cell === "Astro")
                            .map((graph, index) => (
                                <div id="graph1" key={index}>
                                    <Graph graph={graph} options={options} />
                                </div>
                            ))
                        ) : (
                            <p>No ligands found with the specified name and species.</p>
                        )}
                    </div>
                </div>
                <div id="footer-wrapper">
                    <div id="footer1">
                        <div class="left">
                            ref: Min Tian / Carmichael lab @ UCLA
                        </div>
                        <div class="right">
                            for questions concerning vascular dementia study, contact: tianmin1111@gmail.com
                        </div>
                    </div>
                    <hr id="custom-hr"></hr>
                    <div id="footer2">
                        Site By Yuqi Huang and Yun Zhang
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;
