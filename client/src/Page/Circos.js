import React, { useEffect, useState } from 'react';

function Circos() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch(`http://localhost:8000/Circos`)
            .then(response => response.json())
            .then(ligandReceptorData => {
                // Transform the data
                const transformedData = ligandReceptorData.map(doc => {
                    return {
                        source: {
                            id: doc.ligand
                        },
                        target: {
                            id: doc.receptor
                        }
                    };
                });
                setData(transformedData);
                console.log(transformedData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);  // The empty dependency array ensures this useEffect runs once when the component mounts

    return (
        <>
            <div id="header">
                <nav>
                    <h1>BioWebTitle</h1>
                    <li><a href='/'>Home</a></li>
                    <li ><a href="#extra">Bolgs</a></li>
                    <li ><a href="/Circos">Circos</a></li>
                    <li ><a href="#extra">Contact US</a></li>
                </nav>
            </div>
            <div id="chart"></div>
        </>
    )
}
export default Circos;