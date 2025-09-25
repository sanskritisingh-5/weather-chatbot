# Weather ChatBot

A professional React-based Weather ChatBot with a modern and interactive UI.

---

## 🌟 Features

- **Real-time weather updates** using [OpenWeatherMap API](https://openweathermap.org/api)  
- **Dark/Light mode toggle** for user preference  
- **Timestamps** for every message  
- **Auto-scroll** to always show the latest messages  
- **Weather icons** for visual clarity  
- **Responsive design** that works on desktop and mobile  

---

## 💻 Demo

*(Add a screenshot or GIF here of your chat app in action)*

---

## 🚀 Installation

1. Clone the repository or download the ZIP.
2. Open the project folder in your terminal.
3. Install dependencies:

```bash
npm install

Start the development server:

npm start


Open http://localhost:3000 in your browser.

⚠️ Note

You need an OpenWeatherMap API key to fetch weather data.

Create a .env file in the root folder with the following content:

REACT_APP_WEATHER_KEY=YOUR_OPENWEATHERMAP_KEY


In App.js, replace:

const API_KEY = "YOUR_OPENWEATHERMAP_KEY";


with:

const API_KEY = process.env.REACT_APP_WEATHER_KEY;


Make sure to add .env to your .gitignore to avoid exposing your API key publicly.

Project Structure
my-app/
├─ public/
├─ src/
│  ├─ App.js
│  ├─ App.css
│  └─ index.js
├─ .gitignore
├─ package.json
└─ README.md

📝 .gitignore (recommended)
node_modules
.env
build
.DS_Store
