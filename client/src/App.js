import React from 'react';
function App() {
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
						<li ><a href=
							"https://practice.geeksforgeeks.org/?ref=ghm">
							Courses</a></li>
              {/* Add the search bar and button */}
            <li>
            <div id="search-container">
              <input type="text" id="search-bar" placeholder="Search" />
              <button id="search-button">Search</button>
            </div>
            </li>
					</nav>
				</div>
				<div id="wrapper">
					<div id="content">
						<h1>Welcome to Geeksforgeeks</h1>
						<h2>Web Description </h2>
						<p>
							Geeksforgeeks provides you to best
							tutorials, articles, coding, courses etc.
							<p>Geeksforgeeks DSA self placed code is
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
export default App;
