// Runs when page is ready
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
  if (chatToggle && chatContainer) {
    chatToggle.addEventListener("click", () => {
      chatContainer.style.display = 
        chatContainer.style.display === "none" || chatContainer.style.display === "" 
          ? "flex" 
          : "none";
    });
  }

  // Load chat history
  const savedChat = localStorage.getItem("chatHistory");
  if (savedChat) {
    document.getElementById("chatbox").innerHTML = savedChat;
  }

  // Ask for username if not set
  let username = localStorage.getItem("chatUsername");
  if (!username) {
    askForName();
  } else {
    const greet = document.createElement("div");
    greet.className = "bot-message";
    greet.textContent = `Welcome back, ${username}!`;
    document.getElementById("chatbox").appendChild(greet);
    saveChat();
  }
});

// Send message
function sendMessage() {
  const inputField = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const userInput = inputField.value.trim();

  if (!userInput) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = `You (${getCurrentTime()}): ${userInput}`;
  chatbox.appendChild(userMsg);

  const botMsg = document.createElement("div");
  botMsg.className = "bot-message";
  botMsg.textContent = `Bot (${getCurrentTime()}): ${generateBotReply(userInput)}`;
  chatbox.appendChild(botMsg);

  inputField.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  saveChat();
}

// Enter key to send message
document.addEventListener("keydown", function (e) {
  const inputField = document.getElementById("userInput");
  if (e.key === "Enter" && document.activeElement === inputField) {
    sendMessage();
  }
});

// Generate bot response
function generateBotReply(input) {
  const text = input.toLowerCase();

  if (text.includes("hello")) return "Hi there!";
  if (text.includes("how are you")) return "I'm just code, but I feel alive!";
  if (text.includes("your name")) return "I'm a simple bot built by Ace.";
  if (text.includes("what can you do")) return "I can respond to your messages and keep you company!";
  if (text.includes("bye")) return "Goodbye, friend!";

  return "🤖 I'm not sure how to respond to that. Try something else?";
}

// Save chat history
function saveChat() {
  const chatbox = document.getElementById("chatbox");
  localStorage.setItem("chatHistory", chatbox.innerHTML);
}

// Clear chat
function clearChat() {
  document.getElementById("chatbox").innerHTML = "";
  localStorage.removeItem("chatHistory");
}

// Get current time
function getCurrentTime() {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
}

// Ask for user name
function askForName() {
  const name = prompt("Hi! What's your name?");
  if (name && name.trim() !== "") {
    const username = name.trim();
    localStorage.setItem("chatUsername", username);

    const welcome = document.createElement("div");
    welcome.className = "bot-message";
    welcome.textContent = `Nice to meet you, ${username}! Ask me anything.`;

    document.getElementById("chatbox").appendChild(welcome);
    saveChat();
  } else {
    askForName(); // Try again if blank
  }
}

// Expose functions for inline buttons
window.sendMessage = sendMessage;
window.clearChat = clearChat;
