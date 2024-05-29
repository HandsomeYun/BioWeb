    import React, { useState, useEffect } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { useSearchParams } from 'react-router-dom';
    import Graph from 'react-graph-vis';
    import 'vis-network/styles/vis-network.css';
    import '../style/SearchPage.css';
    
    function SearchResult() {
        const [graphData, setGraphData] = useState([]);

        const [isFilterOpen, setIsFilterOpen] = useState(false);
        const [searchParams] = useSearchParams();
        const initialSearchTerm = searchParams.get('name');  //pass the name of the ligand
        const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
        const initialSpeciesType = searchParams.get('species');
        const [selectedSpecies, setSelectedSpecies] = useState(initialSpeciesType);

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
                window.location.href = `/findBySpecies/findByLigand?species=${selectedSpecies}&name=${searchTerm}`;
            }
        };

        //mandatorily convert the first letter to upper case
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };
        var selected_Species = "";
        //process the species name here
        if(selectedSpecies=="Human"){
            selected_Species = "human";
        } else {
            selected_Species = "rat";
        }
        useEffect(() => {
            if (searchTerm) {
                const capitalizedSearchTerm = capitalizeFirstLetter(searchTerm);
                const baseURL = `/api/findBySpecies/findByLigand?species=${selected_Species}&name=${capitalizedSearchTerm}`
                fetch(baseURL)
                    .then(response => response.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            // Group by ligand first
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
                                        id: capitalizedSearchTerm, 
                                        label: capitalizedSearchTerm, 
                                        title: capitalizedSearchTerm, 
                                        color: '#25d970', 
                                        size: 100, 
                                        font: {
                                            face: 'Arial',
                                            size: 50
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
                                    
                                    if (item.ligand === capitalizedSearchTerm) {
                                        nodes[0].title = `LogFC_Str_vs_Con.x: ${item.LogFC_Str_vs_Con.x} \nFDR_Str_vs_Con.x: ${item.FDR_Str_vs_Con.x}`;
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
                                        nodes.push({ id: cellNodeId, label: item.receptor_cell, 
                                            title: `LogFC_Str_vs_Con.y: ${item.LogFC_Str_vs_Con.y} \nFDR_Str_vs_Con.y: ${item.FDR_Str_vs_Con.y}`,
                                            color: color, 
                                            size: 15 });
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
                            console.log("Generated graph data:", graphArray);  // Debugging line
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
                zoomView: false,
                dragView: true,
                hover: true
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
                    node: function (values, id, selected, hovering) {
                        values.color = 'grey';  // or whatever logic you have for color
                        values.label = 'center'; // Force center alignment
                    }
                }
            }
        };
    
        
        
        

        return (
            <>
            <div id="container">
                {/* Navigation Bar Starts */}
                <div id="header">
                    <nav>
                        <h1>WhiteMatterWiki</h1>
                        <li><Link to='/'>Home</Link></li>
                        <li ><Link to="/RNAseq">RNA-Seq</Link></li>
                        <li ><Link to="/Circos">Circos</Link></li>
                        <li ><Link to="#extra">Contact US</Link></li>
                    </nav>
                </div>
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
                                    <p className="option" onClick={() => handleOptionClick('Mouse')}>Mouse</p>
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
                                <h3>Graph for Ligand Cell: {graph.ligand_cell}</h3>
                                <div className="graph-container">
                                    <Graph graph={graph} options={options} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No ligands found with the specified name and species.</p>
                    )}
                </div>
            </div>
            </>
        );
    }

    export default SearchResult;
