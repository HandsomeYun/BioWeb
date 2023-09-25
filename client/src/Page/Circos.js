import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Circos.css';

// Import the image from the asset folder
import circosImage from './asset/circos_plot.png';

function CircosPage() {
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
            <div id="chart">
                {/* Display the image */}
                <img src={circosImage} alt="Circos Plot" />
            </div>
        </>
    )
}

export default CircosPage;
