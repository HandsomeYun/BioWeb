import React from 'react';
import { Link } from 'react-router-dom';

function RNA_seq_Page(){
    return(
        <>
            <div id="header">
                <nav>
                    <h1>WhiteMatterWiki</h1>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/RNAseq'>RNA-Seq</Link></li>
                    <li><Link to='/Circos'>Circos</Link></li>
                    <li><Link to='#extra'>Contact US</Link ></li>
                </nav>
            </div>
        </>
    )
}

export default RNA_seq_Page