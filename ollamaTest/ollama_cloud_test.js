import axios from "axios";
import readlineSync from "readline-sync";

// -----------------------------------------
// 🔧 CONFIGURATION — CHANGE THESE VALUES
// -----------------------------------------

// ✅ The Ollama Cloud endpoint (don’t change unless your account has a custom one)
const OLLAMA_CLOUD_URL = "https://api.ollama.ai/v1/chat/completions";

// ✅ Model name — choose one that your Ollama Cloud account supports
const MODEL = "llama3";

// ✅ Your Ollama Cloud API key (set this once you have it)
const API_KEY = "YOUR_OLLAMA_CLOUD_API_KEY_HERE"; // <-- 🔒 put your key here

// -----------------------------------------
// 💬 FUNCTION TO SEND QUESTION
// -----------------------------------------

async function askOllama(question) {
  try {
    const response = await axios.post(
      OLLAMA_CLOUD_URL,
      {
        model: MODEL,
        messages: [{ role: "user", content: question }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`, // required for cloud auth
        },
      }
    );

    const answer = response.data.choices?.[0]?.message?.content || "No response.";
    console.log(`\n🤖 ${MODEL} says:\n${answer}\n`);
  } catch (err) {
    console.error("\n❌ Error connecting to Ollama Cloud:");
    if (err.response) {
      console.error(err.response.data);
    } else {
      console.error(err.message);
    }
  }
}

// -----------------------------------------
// 🚀 RUN TEST
// -----------------------------------------

const question = readlineSync.question("💬 Ask Ollama Cloud something: ");
askOllama(question);