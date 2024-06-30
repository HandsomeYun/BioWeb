import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Contact.css';



function Contact(){
    return(
        <>
            <div id="header">
                <nav>
                    <h1>WhiteMatterWiki</h1>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/RNAseq'>RNA-Seq</Link></li>
                    <li><Link to='/Circos'>Circos</Link></li>
                    <li><Link to='/Contact'>Contact US</Link ></li>
                </nav>
            </div>
            <div id="intro">
                We'd Love to Hear From You
            </div>
            <div id="subcontent">
                Contact us for more information, collaborations, or any questions you may have.
            </div>
            <div classname="info">
                <div className='columns'>
                    <div className='column'>
                        <h3>For enquiries or commants regarding the web page, <br /> please contact:</h3>
                        <p>Yuqi Huang</p>
                        <a href="mailto:yuki19@g.ucla.edu">yuki19@g.ucla.edu</a>
                        <p>Yun Zhang</p>
                        <a href="mailto:yun666@g.ucla.edu">yun666@g.ucla.edu</a>
                    </div>
                    <div className='column'>
                        <h3>For dataset specific questions, <br /> please contact:</h3>
                        <p>Min Tian</p>
                        <a href="mailto:tianmin1111@gmail.com">tianmin1111@gmail.com</a>
                        <p>Linkedin Page</p>
                        <a href="https://www.linkedin.com/in/min-tian-970375116/">https://www.linkedin.com/in/min-tian-970375116/</a>
                    </div>
                </div>
            </div>
            <div id="footer-wrapper-c">
                    <div id="footer1-c">
                        <div class="left">
                            ref: Min Tian / Carmichael lab @ UCLA
                        </div>
                        <div class="right">
                            for questions concerning vascular dementia study, contact: tianmin1111@gmail.com
                        </div>
                    </div>
                    <hr id="custom-hr"></hr>
                    <div id="footer2-c">
                        Site By Yuqi Huang Yun Zhang
                    </div>
                </div>
        </>
    )
}




export default Contact