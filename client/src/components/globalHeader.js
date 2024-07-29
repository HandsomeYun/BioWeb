import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function GlobalHeader({ page }) {
    return (
        <div className='header'>
            <nav>
                <h1>WhiteMatterWiki</h1>
                <li>
                    <Link to='/'
                    className={`home-link ${page.text === 'home' ? 'underline' : ''}`}
                    >
                    Home
                    </Link>
                </li>
                <li>
                    <Link to='/RNAseq'
                    className={`RNAseq ${page.text === 'RNAseq' ? 'underline' : ''}`}
                    >
                    RNAseq
                    </Link>
                </li>
                <li>
                    <Link to='/Circos'
                    className={`Circos ${page.text === 'Circos' ? 'underline' : ''}`}
                    >
                    Circos
                    </Link>
                </li>
                <li>
                    <Link to='/Contact'
                    className={`Contact ${page.text === 'Contact' ? 'underline' : ''}`}
                    >
                    Contact
                    </Link>
                </li>
            </nav>
        </div>
    );
}

export default GlobalHeader;