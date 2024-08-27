# WhiteMatterWiki

This repository contains the source code for a web application designed to visualize and explore a large database of scientific documents. The application leverages modern web technologies to provide an interactive and engaging experience for users, enabling them to search, filter, and visualize complex relationships among ligands, receptors, and cells.

## Features

- **Database Integration:** 
  - The application interfaces with a MongoDB database containing 60,667 documents, allowing users to explore the lab's extensive data.
  
- **Interactive Visualization:**
  - Developed using React and Node.js, the frontend features interactive graphs and visualizations that make it easier to understand the intricate relationships within the dataset.
  
- **Advanced Animations:**
  - Leveraging Java and R, the application includes captivating animations and circus graphs that effectively illustrate complex data connections.
  
- **Deployment:**
  - The frontend is deployed using Nginx, ensuring efficient and scalable delivery of the application.
  - The backend is managed by PM2, providing robust process management and monitoring for the Node.js environment.

## Technologies Used

- **Frontend:** React, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Visualization:** Java, R
- **Deployment:** Nginx, PM2

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HandsomeYun/BioWeb.git
   cd BioWeb
   ```
2. **Install the dependencies:**

   ```bash
   npm install
   ```
3. **Start the development server:**
  ```bash
  npm run dev
  ```
4. **Deploy the frontend:**
   ```bash
   npm run build
   ```
5. **Manage the backend with PM2**
   ```bash
   pm2 start server.js
   ```
