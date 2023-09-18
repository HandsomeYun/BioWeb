import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Circos from 'circos';
import '../style/Circos.css'


function CircosPage() {

    useEffect(() => {
         // Automatically adjust the size of container.
         var width = document.getElementById('chart').offsetWidth;

        const gieStainColor = {
            ligand: 'rgb(0,0,255)', // You can change this to any color you want for ligands.
            receptor: 'rgb(255,0,0)' // And this for receptors.
        };

        const circos = new Circos({
            container: '#chart',
            width: width,
            height: width
        });

        // Fetch data from the API
        fetch(`http://localhost:8000/Circos`)
            .then(response => response.json())
            .then(data => {
                console.log("data",data);
                const copiedData = JSON.parse(JSON.stringify(data));
                
                circos
                .layout(copiedData, {
                    innerRadius: width / 2 - 100,
                    outerRadius: width / 2 - 80,
                    labels: { display: false },
                    ticks: { display: false }
                })
                .highlight('entities', copiedData, {
                    innerRadius: width / 2 - 100,
                    outerRadius: width / 2 - 80,
                    opacity: 0.7,
                    color: d => d.color
                })
                .text('entities-labels', copiedData, {
                    innerRadius: 1.02,
                    outerRadius: 1.3,
                    style: { 'font-size': 12 },
                    color: d => d.color
                })
                .render();
        })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <div id="header">
                <nav>
                    <h1>BioWebTitle</h1>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='#extra'>Blogs</Link></li>
                    <li><Link to='/Circos'>Circos</Link></li>
                    <li><Link to='#extra'>Contact US</Link ></li>
                </nav>
            </div>
            <div id="chart"></div>
        </>
    )
}
export default CircosPage;