import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (!input) return; // Prevent sending empty messages
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setChatLog([...chatLog, { user: input, bot: data.response }]);
    setInput(""); // Clear input field after sending
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          <h1>Simple Chatbot</h1>
        </div>
        <div className="card-body">
          <div
            className="chat-box mb-3"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {chatLog.map((entry, index) => (
              <div key={index} className="mb-2">
                <strong className="text-success">You:</strong> {entry.user}{" "}
                <br />
                <strong className="text-info">Bot:</strong> {entry.bot} <br />
              </div>
            ))}
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a command (e.g., /time, /date)"
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
