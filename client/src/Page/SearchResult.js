import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Graph from 'react-graph-vis';

import '../style/HomePage.css'


function SearchResult() {
    const [graphData, setGraphData] = useState([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [searchParams] = useSearchParams();
    const initialSearchTerm = searchParams.get('name');
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    const handleSelectionClick = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedSpecies(option);
        setIsFilterOpen(false);
    };

    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/FindByLigand?name=${searchTerm}`);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            fetch(`http://localhost:8000/FindByLigand?name=${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const graphs = {};

                        data.forEach(item => {
                            const edge1Str = `${item.ligand}->${item.receptor}`;
                            const edge2Str = `${item.receptor}->${item.receptor_cell}`;
                            const graphKey = `${item.ligand}`;

                            // If the combination doesn't have a graph yet, initialize one
                            if (!graphs[graphKey]) {
                                graphs[graphKey] = {
                                    nodes: [{ id: item.ligand, label: item.ligand, title: item.ligand, color: 'green', size: 100, font: { 
                                        face: 'Arial',  // Set the font-face of the ligand node to 'Arial' or any other font you prefer.
                                        size: 50    // Optionally, change the font-color for ligand to red.
                                    }}],
                                    edges: [],
                                    receptorNodeIds: new Set(),
                                    edgeSet: new Set()
                                };
                            }

                            const { nodes, edges, receptorNodeIds, edgeSet } = graphs[graphKey];

                            // Add receptor node if it doesn't exist
                            if (!receptorNodeIds.has(item.receptor)) {
                                nodes.push({ id: item.receptor, label: item.receptor, title: item.receptor, color: 'orange', value:10});
                                receptorNodeIds.add(item.receptor);
                            }
                            
                            // Add receptor_cell node (always, since they should form a 360-degree pattern around their receptor)
                            nodes.push({ id: `${item.receptor}-${item.receptor_cell}`, label: item.receptor_cell, title: item.receptor_cell, color: 'turquoise', size:15});

                            // Add edges if they don't exist
                            if (!edgeSet.has(edge1Str)) {
                                edges.push({ from: item.ligand, to: item.receptor, length:250 });
                                edgeSet.add(edge1Str);
                            }

                            if (!edgeSet.has(edge2Str)) {
                                edges.push({ from: item.receptor, to: `${item.receptor}-${item.receptor_cell}`, length: 50 });
                                edgeSet.add(edge2Str);
                            }
                        });

                        Object.entries(graphs).forEach(([key, graph]) => {
                            console.log(`Graph for key ${key}:`);
                            console.log('Nodes:', graph.nodes);
                            console.log('Edges:', graph.edges);
                        });

                        const graphArray = Object.values(graphs);
                        setGraphData(graphArray);
                    } else {
                        console.error("API response is not an array:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching search results:", error);
                });
        }
    }, [searchTerm]);

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
                centralGravity: 0.5,
                springLength: 95,
                springConstant: 0.18,
                damping: 0.83,
                avoidOverlap: 1
            }
        },
        interaction: {
            zoomView: true,
            dragView: true
        },
        nodes: {
            shape: 'circle',
            scaling: {
                min: 10,
                max: 40,
                customScalingFunction: (min, max, total, value) => {
                    return value;  // Just return the value, effectively disabling scaling
                }
            },
            font: {
                size: 15,
                face: 'Tahoma',
                background: 'transparent', // Set a transparent background for the font
                strokeWidth: 0,  // No border around the text
                align: 'center'  // Center the text inside the node
            },
            chosen: { // Only include this if nothing else works
                node: function(values, id, selected, hovering) {
                    values.color = 'grey';  // or whatever logic you have for color
                    values.label = 'center'; // Force center alignment
                }
            }
        }
    };

    return (
        <>
            {/* Here starts the Search Bar*/}
            <div className="box">
                <form action="#" onSubmit={handleSearchSubmit}>
                    <div className="input_box">
                        <input
                            type="text"
                            id="search-bar"
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
                                <p className="option" onClick={() => handleOptionClick('Rat')}>Rat</p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <br />
            {/* Search Bar Ends*/}

            <div>
                <h2>Search Results for: {searchTerm}</h2>
                {graphData.length > 0 ? (
                    graphData.map((graph, index) => (
                        <div key={index}>
                            <h3>Graph: {index + 1}</h3>
                            <div className="graph-container">
                                <Graph graph={graph} options={options} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No ligands found with the specified name.</p>
                )}
            </div>
        </>
    );
}

export default SearchResult;
