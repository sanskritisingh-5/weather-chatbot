import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: "agent", text: "Hello! Ask me about the weather 🌤️", time: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatWindowRef = useRef(null);

  const API_KEY = "3dd076e78482516419e5dff5d88202da";

  // Auto-scroll
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage = { sender: "user", text: input, time: new Date() };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric`
      );

      const data = response.data;

      // Build message text
      const weatherText = `Weather in ${data.name}: ${data.weather[0].description}, Temp: ${data.main.temp}°C, Humidity: ${data.main.humidity}%`;

      // Build icon URL
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: weatherText,
          time: new Date(),
          icon: iconUrl, // add icon property
        },
      ]);
    } catch (error) {
      console.error("Weather API error:", error.response ? error.response.data : error.message);
      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: "⚠️ Could not fetch weather. Try again.", time: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`chat-container ${darkMode ? "dark" : "light"}`}>
      <div className="header">
        <h2>Weather ChatBot</h2>
        <button className="toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "user" ? "user" : "agent"}`}>
            {msg.icon && <img src={msg.icon} alt="weather" className="weather-icon" />}
            <div className="message-text">{msg.text}</div>
            <div className="message-time">
              {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        ))}
        {loading && <div className="message agent">⏳ Fetching weather...</div>}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a city name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default App;
