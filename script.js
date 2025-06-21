// Handle navigation between sections
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

  // Restore chat
  const savedChat = localStorage.getItem("chatHistory");
  if (savedChat) {
    document.getElementById("chatbox").innerHTML = savedChat;
  }

  // Greeting
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

// Handle sending messages
function sendMessage() {
  const inputField = document.getElementById("userInput");
  const userInput = inputField.value.trim();
  const chatbox = document.getElementById("chatbox");

  if (!userInput) return;

  const userMsg = document.createElement("div");
  userMsg.textContent = `You (${getCurrentTime()}): ${userInput}`;
  userMsg.className = "user-message";
  userMsg.style.textAlign = "right";
  userMsg.style.margin = "10px";

  const botMsg = document.createElement("div");
  botMsg.textContent = `Bot (${getCurrentTime()}): ${generateBotReply(userInput)}`;
  botMsg.className = "bot-message";
  botMsg.style.textAlign = "left";
  botMsg.style.margin = "10px";

  chatbox.appendChild(userMsg);
  chatbox.appendChild(botMsg);
  inputField.value = "";

  saveChat();
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Handle Enter key
const inputField = document.getElementById("userInput");
  if (inputField) {
    inputField.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  }
  }
});

// Generate bot reply
function generateBotReply(input) {
  input = input.toLowerCase();

  if (input.includes("hello")) {
    return "Hi there!";
  } else if (input.includes("how are you")) {
    return "I'm just code, but I'm running smoothly!";
  } else if (input.includes("your name")) {
    return "I'm a simple bot Ace is building from scratch!";
  } else if (input.includes("what can you do")) {
    return "Right now, I can respond to basic messages. But I'm learning!";
  } else if (input.includes("bye")) {
    return "Goodbye! Come chat with me again soon.";
  } else {
    return "Beep boop 🤖… no clue what that means. Try again, maybe slower? 😂";
  }
}

// Save chat to localStorage
function saveChat() {
  const chatbox = document.getElementById("chatbox");
  localStorage.setItem("chatHistory", chatbox.innerHTML);
}

// Clear chat history
function clearChat() {
  localStorage.removeItem("chatHistory");
  document.getElementById("chatbox").innerHTML = "";
}

// Get formatted time
function getCurrentTime() {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
}

// Ask for user's name
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
    askForName(); // Keep asking until name is entered
  }
}
// Expose key functions globally for inline button use
window.sendMessage = sendMessage;
window.clearChat = clearChat;
