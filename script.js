document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll(".content-section");
  const defaultActive = document.querySelector('nav ul li a[data-section="home"]');
  const chatToggle = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("chatbot-container");

  // Set default section
  if (defaultActive) defaultActive.classList.add("active");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");

      sections.forEach(section => {
        section.style.display = section.id === target ? "block" : "none";
      });

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Toggle chat visibility
  chatToggle?.addEventListener("click", () => {
    const current = chatContainer.style.display;
    chatContainer.style.display = (current === "none" || !current) ? "flex" : "none";
  });

  // Load chat history
  const savedChat = localStorage.getItem("chatHistory");
  if (savedChat) document.getElementById("chatbox").innerHTML = savedChat;

  // Greet returning user or ask name
  const username = localStorage.getItem("chatUsername");
  if (username) {
    appendBotMessage(`Welcome back, ${username}!`);
  } else {
    askForName();
  }

  saveChat();
});

// Send message
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  appendUserMessage(text);
  appendBotMessage(generateBotReply(text));
  input.value = "";
  document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
  saveChat();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.activeElement.id === "userInput") {
    sendMessage();
  }
});

// Message rendering
function appendUserMessage(text) {
  const msg = document.createElement("div");
  msg.className = "user-message";
  msg.textContent = `You (${getCurrentTime()}): ${text}`;
  document.getElementById("chatbox").appendChild(msg);
}

function appendBotMessage(text) {
  const msg = document.createElement("div");
  msg.className = "bot-message";
  msg.textContent = `Bot (${getCurrentTime()}): ${text}`;
  document.getElementById("chatbox").appendChild(msg);
}

// Bot reply logic
function generateBotReply(input) {
  const text = input.toLowerCase();
  const intentMap = [
    { keywords: ["photos", "gallery", "pictures"], section: "gallery", reply: "Check out our photo gallery 📸" },
    { keywords: ["players", "team", "squad", "who plays"], section: "team", reply: "Here’s our team lineup 👥" },
    { keywords: ["fixtures", "next match", "schedule", "games"], section: "fixtures", reply: "Here are the upcoming fixtures 📅" },
    { keywords: ["venue", "where do you play", "where is the match"], section: "fixtures", reply: "We play at Kerarapon Primary Grounds 🏟️" },
    { keywords: ["contact", "reach", "talk to you"], section: "contact", reply: "Here’s our contact info ✉️" }
  ];

  for (const intent of intentMap) {
    if (intent.keywords.some(word => text.includes(word))) {
      document.querySelector(`a[data-section="${intent.section}"]`)?.click();
      return intent.reply;
    }
  }

  const greetings = ["hi", "hello", "hey", "yo", "good morning", "good evening"];
  if (greetings.some(greet => text.includes(greet))) {
    return "Hey! 👋 Ask about fixtures, players, photos, or contact.";
  }

  if (text.includes("your name")) return "You can call me Ace 🤖.";
  if (text.includes("what can you do")) return "I can show you fixtures, team info, and more.";
  if (text.includes("bye")) return "Goodbye! 👋 See you soon.";

  return "Hmm... I didn’t catch that. Try asking about fixtures, team, or gallery.";
}

// Save and restore
function saveChat() {
  localStorage.setItem("chatHistory", document.getElementById("chatbox").innerHTML);
}

function clearChat() {
  document.getElementById("chatbox").innerHTML = "";
  localStorage.removeItem("chatHistory");
}

// Splash
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  setTimeout(() => {
    splash.style.opacity = "0";
    setTimeout(() => splash.style.display = "none", 1000);
  }, 2500);
});

// Ask name
function askForName() {
  const name = prompt("Hi! What's your name?");
  if (name && name.trim()) {
    const username = name.trim();
    localStorage.setItem("chatUsername", username);
    appendBotMessage(`Nice to meet you, ${username}! Ask me anything.`);
  } else {
    askForName(); // retry
  }
}

// Helpers
function getCurrentTime() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
}

window.sendMessage = sendMessage;
window.clearChat = clearChat;
