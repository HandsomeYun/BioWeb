import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/HomePage.css'

function HomePage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSpecies, setSelectedSpecies] = useState('');

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
            navigate(`/FindByLigand?name=${searchTerm}`);
        }
    };

    return (
        <>
            <div id="container">
                <div id="header">
                    <nav>
                        <h1>BioWebTitle</h1>
                        <li><a href='#header'>Home</a></li>
                        <li ><a href="#extra">Bolgs</a></li>
                        <li ><a href=
                            "https://www.geeksforgeeks.org/about/contact-us/?ref=write-footer">
                            Contact US</a></li>
                    </nav>
                </div>
                <div id="wrapper">
                    <div id="content">
                        <h1>Welcome to BioWeb</h1>

                        {/* Here starts the Search Bar*/}
                        <ul>
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
                        </ul>
                        <br />
                        {/* Search Bar Ends*/}

                        <h2>Web Description </h2>
                        <p>
                            BioWeb provides you to best
                            tutorials, articles, coding, courses etc.
                            <p>BioWeb DSA self placed code is
                                best course ever and it is made by experts.</p>
                        </p>
                        <button>Learn More</button>
                    </div>
                </div>
                <div id="navigation">
                    <img src=
                        "https://media.geeksforgeeks.org/wp-content/uploads/20221207112807/Image1.png"
                        alt="logo" />
                </div>
                <div id="extra">
                    <div id="card">
                        <h3>Create Math captcha using PHP</h3>
                        <p>In this article we are implement Math captcha.</p>
                        <button>Read More</button>
                    </div>
                    <div id="card">
                        <h3>Style Google Custom Search Manually</h3>
                        <p>We are styling Google Custom Search
                            manually with CSS</p>
                        <button>Read More</button>
                    </div>
                    <div id="card">
                        <h3>What is Interaction Manager.</h3>
                        <p>In this article we will see what is
                            Interaction Manager and how use it.</p>
                        <button>Read More</button>
                    </div>
                </div>
                <div id="footer"><p>Copyright@2007</p>
                </div>
            </div>
        </>
    )
}
export default HomePage;
