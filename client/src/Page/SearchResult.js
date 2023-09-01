import React, { useState, useEffect} from 'react';
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
                            const graphKey = `${item.ligand}-${item.ligand_cell}`;

                            // If the combination doesn't have a graph yet, initialize one
                            if (!graphs[graphKey]) {
                                graphs[graphKey] = {
                                    nodes: [],
                                    edges: [],
                                    nodeIds: new Set(),
                                    edgeSet: new Set()
                                };
                            }

                            const { nodes, edges, nodeIds, edgeSet } = graphs[graphKey];

                            // Check if ligand node exists
                            if (!nodeIds.has(item.ligand)) {
                                nodes.push({ id: item.ligand, label: item.ligand, title: item.ligand });
                                nodeIds.add(item.ligand);
                            }

                            // Check if receptor node exists
                            if (!nodeIds.has(item.receptor)) {
                                nodes.push({ id: item.receptor, label: item.receptor, title: item.receptor });
                                nodeIds.add(item.receptor);
                            }

                            // Check if receptor_cell node exists
                            if (!nodeIds.has(item.receptor_cell)) {
                                nodes.push({ id: item.receptor_cell, label: item.receptor_cell, title: item.receptor_cell });
                                nodeIds.add(item.receptor_cell);
                            }

                            // Add edges if they don't exist
                            if (!edgeSet.has(edge1Str)) {
                                edges.push({ from: item.ligand, to: item.receptor });
                                edgeSet.add(edge1Str);
                            }

                            if (!edgeSet.has(edge2Str)) {
                                edges.push({ from: item.receptor, to: item.receptor_cell });
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
            hierarchical: {
                enabled: true,
                levelSeparation: 150,
                nodeSpacing: 100,
                treeSpacing: 200,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
                direction: "UD", // "UD" for top-to-bottom layout
                sortMethod: "directed" // "directed" to follow the edges' direction
            }
        },
        edges: {
            color: "#000000"
        },
        physics: {
            enabled: false // Disable physics to allow zooming and panning
        },
        interaction: {
            zoomView: true,
            dragView: true
        },
        nodes: {
            shape: 'dot',
            scaling: {
                min: 20, // Adjust as needed
                max: 50  // Adjust as needed
            },
            font: {
                size: 12,
                face: 'Tahoma'
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
