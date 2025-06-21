document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll(".content-section");
  const defaultActive = document.querySelector('nav ul li a[data-section="home"]');

  if (defaultActive) defaultActive.classList.add("active");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");

      sections.forEach(section => {
        section.style.display = section.id === target ? "block" : "none";
      });

      links.forEach(link => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Load chat history
  const savedChat = localStorage.getItem("chatHistory");
  if (savedChat) {
    document.getElementById("chatbox").innerHTML = savedChat;
  }

  // Greet user
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

  // Listen for Enter key
  const input = document.getElementById("userInput");
  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  }
});

// Toggle chatbot visibility
function toggleChat() {
  const bot = document.getElementById("chatbot-container");
  bot.classList.toggle("hidden");
}

// Send message
function sendMessage() {
  const inputField = document.getElementById("userInput");
  const userInput = inputField.value.trim();
  const chatbox = document.getElementById("chatbox");

  if (!userInput) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = `You (${getCurrentTime()}): ${userInput}`;

  const botMsg = document.createElement("div");
  botMsg.className = "bot-message";
  botMsg.textContent = `Bot (${getCurrentTime()}): ${generateBotReply(userInput)}`;

  chatbox.appendChild(userMsg);
  chatbox.appendChild(botMsg);
  inputField.value = "";

  saveChat();
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Bot replies
function generateBotReply(input) {
  input = input.toLowerCase();

  if (input.includes("hello")) return "Hi there!";
  if (input.includes("how are you")) return "I'm just code, but I'm running fine!";
  if (input.includes("your name")) return "I'm Ace's simple chatbot!";
  if (input.includes("what can you do")) return "I chat and I grow. More updates soon!";
  if (input.includes("bye")) return "See you soon!";
  return "Hmm... not sure what that means 🤖.";
}

// Save chat
function saveChat() {
  const chatbox = document.getElementById("chatbox");
  localStorage.setItem("chatHistory", chatbox.innerHTML);
}

// Clear chat
function clearChat() {
  localStorage.removeItem("chatHistory");
  document.getElementById("chatbox").innerHTML = "";
}

// Get time
function getCurrentTime() {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
}

// Ask name
function askForName() {
  const name = prompt("Hi! What's your name?");
  if (name && name.trim() !== "") {
    const username = name.trim();
    localStorage.setItem("chatUsername", username);

    const welcome = document.createElement("div");
    welcome.className = "bot-message";
    welcome.textContent = `Nice to meet you, ${username}!`;

    document.getElementById("chatbox").appendChild(welcome);
    saveChat();
  } else {
    askForName();
  }
}

// Expose to HTML
window.sendMessage = sendMessage;
window.clearChat = clearChat;
window.toggleChat = toggleChat;
