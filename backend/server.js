const express = require("express");
const cors = require("cors");
const { Groq } = require("groq-sdk");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Replace this with your actual GROQ AI API endpoint and key
const GROQ_AI_API_URL = "https://api.groq.ai/v1/chat";
const GROQ_AI_API_KEY =
  "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"; // Make sure to use a valid API key

const groq = new Groq({ apiKey: GROQ_AI_API_KEY });

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  // If message starts with '/', handle it locally
  if (message.startsWith("/")) {
    if (message === "/time") {
      const time = new Date().toLocaleTimeString();
      return res.json({ response: `Current time is ${time}` });
    } else if (message === "/date") {
      const date = new Date().toLocaleDateString();
      return res.json({ response: `Today's date is ${date}` });
    } else if (message === "/weather") {
      return res.json({
        response: "This feature can be implemented on demand.",
      });
    } else {
      return res.json({ response: `Unknown command: ${message}` });
    }
  }
  // If message doesn't start with '/', fetch response from GROQ AI
  else {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        model: "llama3-8b-8192",
      });
      return res.json({
        response: chatCompletion.choices[0]?.message?.content || "",
      });
    } catch (error) {
      console.error("Error fetching data from GROQ AI:", error);
      return res
        .status(500)
        .json({ response: "Error fetching response from AI." });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
