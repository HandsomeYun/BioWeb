import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Circos.css';

// Import the image from the asset folder
import Astro_Mouse_hVaD from './asset/Identified_by_Mouse/Astro_Mouse_hVaD.png';
import Astro_Mouse_mVaD from './asset/Identified_by_Mouse/Astro_Mouse_mVaD.png';
import EC_Mouse_hVaD from './asset/Identified_by_Mouse/EC_Mouse_hVaD.png';
import EC_Mouse_mVaD from './asset/Identified_by_Mouse/EC_Mouse_mVaD.png';
import Micro_Mouse_hVaD from './asset/Identified_by_Mouse/Micro_Mouse_hVaD.png';
import Micro_Mouse_mVaD from './asset/Identified_by_Mouse/Micro_Mouse_mVaD.png';
import Mur_Mouse_hVaD from './asset/Identified_by_Mouse/Mur_Mouse_hVaD.png';
import Neuron_Mouse_hVaD from './asset/Identified_by_Mouse/Neuron_Mouse_hVaD.png';
import Oligo_Mouse_hVaD from './asset/Identified_by_Mouse/Oligo_Mouse_hVaD.png';
import OPC_Mouse_hVaD from './asset/Identified_by_Mouse/OPC_Mouse_hVaD.png';
import OPC_Mouse_mVaD from './asset/Identified_by_Mouse/OPC_Mouse_mVaD.png';
import Peri_Mouse_mVaD from './asset/Identified_by_Mouse/Peri_Mouse_mVaD.png';

import Astro_Human_hVaD from './asset/Identified_by_Human/Astro_Human_hVaD.png';
import Astrocyte_Human_mVaD from './asset/Identified_by_Human/Astrocyte_Human_mVaD.png';
import EC_Human_hVaD from './asset/Identified_by_Human/EC_Human_hVaD.png';
import EC_Human_mVaD from './asset/Identified_by_Human/EC_Human_mVaD.png';
import Micro_Human_hVaD from './asset/Identified_by_Human/Micro_Human_hVaD.png';
import Micro_Human_mVaD from './asset/Identified_by_Human/Micro_Human_mVaD.png';
import Mur_Human_hVaD from './asset/Identified_by_Human/Mur_Human_hVaD.png';
import Neuron_Human_hVaD from './asset/Identified_by_Human/Neuron_Human_hVaD.png';
import Oligo_Human_hVaD from './asset/Identified_by_Human/Oligo_Human_hVaD.png';
import OPC_Human_hVaD from './asset/Identified_by_Human/OPC_Human_hVaD.png';
import OPC_Human_mVaD from './asset/Identified_by_Human/OPC_Human_mVaD.png';
import Peri_Human_mVaD from './asset/Identified_by_Human/Peri_Human_mVaD.png';

const imagesByCategory = {
    hVaD: {
      mouse: {
        Astrocyte: Astro_Mouse_hVaD,
        EC: EC_Mouse_hVaD,
        Microglia: Micro_Mouse_hVaD,
        Mur: Mur_Mouse_hVaD,
        Neuron: Neuron_Mouse_hVaD,
        Oligo: Oligo_Mouse_hVaD,
        OPC: OPC_Mouse_hVaD,
      },
      human: {
        Astrocyte: Astro_Human_hVaD,
        EC: EC_Human_hVaD,
        Micro: Micro_Human_hVaD,
        Mur: Mur_Human_hVaD,
        Neuron: Neuron_Human_hVaD,
        Oligo: Oligo_Human_hVaD,
        OPC: OPC_Human_hVaD,
      },
    },
    mVaD: {
      mouse: {
        Astro: Astro_Mouse_mVaD,
        EC: EC_Mouse_mVaD,
        Micro: Micro_Mouse_mVaD,
        OPC: OPC_Mouse_mVaD,
        Peri: Peri_Mouse_mVaD,
      },
      human: {
        Astro: Astrocyte_Human_mVaD,
        EC: EC_Human_mVaD,
        Micro: Micro_Human_mVaD,
        OPC: OPC_Human_mVaD,
        Peri: Peri_Human_mVaD,
      },
    },
  };
  

function CircosPage() {
    const [selectedVAD, setSelectedVAD] = useState(null); // 'mVaD', 'hVaD', or null
    const [selectedInteractome, setSelectedInteractome] = useState(null); // 'mouse' or 'human'
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isZoomed, setIsZoomed] = useState(false);

    const handleImageClick = () => {
        setIsZoomed(!isZoomed);
    };

    const handleVADClick = (vad) => {
        setSelectedVAD(vad);
        setSelectedInteractome(null);
        setSelectedCategory(null);
    };

    const handleInteractomeClick = (interactome) => {
        setSelectedInteractome(interactome);
        setSelectedCategory(null);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const renderVADButtons = () => (
        <div>
            <button
                onClick={() => handleVADClick('hVaD')}
                className={selectedVAD === 'hVaD' ? 'active' : ''}
            >
                Human VAD
            </button>
            <button
                onClick={() => handleVADClick('mVaD')}
                className={selectedVAD === 'mVaD' ? 'active' : ''}
            >
                Mouse VAD
            </button>
        </div>
    );

    const renderInteractomeButtons = () => (
        selectedVAD && (
            <div>
                <button
                    onClick={() => handleInteractomeClick('human')}
                    className={selectedInteractome === 'human' ? 'active' : ''}
                >
                    Interactome identified by Human
                </button>
                <button
                    onClick={() => handleInteractomeClick('mouse')}
                    className={selectedInteractome === 'mouse' ? 'active' : ''}
                >
                    Interactome identified by Mouse
                </button>
            </div>
        )
    );

    const renderCategoryButtons = () => (
        selectedInteractome && (
            <div>
                {Object.keys(imagesByCategory[selectedVAD][selectedInteractome]).map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={selectedCategory === category ? 'active' : ''}
                    >
                        {category}
                    </button>
                ))}
            </div>
        )
    );

    const renderTitle = () => {
        let title = "";
        if (selectedVAD) {
            title += selectedVAD === 'hVaD' ? 'Human VAD > ' : 'Mouse VAD > ';
        }
        if (selectedInteractome) {
            title += `Interactome identified by ${selectedInteractome.charAt(0).toUpperCase() + selectedInteractome.slice(1)} > `;
        }
        if (selectedCategory) {
            title += `${selectedCategory}`;
        }
        return title || 'Select options';
    };

    const renderImage = () => {
        if (selectedCategory && selectedInteractome && selectedVAD) {
            const imageSrc = imagesByCategory[selectedVAD][selectedInteractome][selectedCategory];
            return (
                <img src={imageSrc} alt={`${selectedCategory} ${selectedInteractome}`}
                    onClick={handleImageClick}
                    className={isZoomed ? 'zoomed' : ''}
                />
            );
        } else {
            return <div className="instruction-text">Please select a VAD type, an Interactome type, and a ligand.</div>;
        }
    };

      
    return (
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
            <div id="dropdown-container">
                {renderVADButtons()}
                {renderInteractomeButtons()}
                {renderCategoryButtons()}
            </div>
            <h2>{renderTitle()}</h2>
            <div id="image-container">
                {renderImage()}
            </div>
        </>
    )
}

export default CircosPage;
