document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll(".content-section");
  
 // Set 'Home' as active on load by default (or whichever you want)
  const defaultActive = document.querySelector('nav ul li a[data-section="home"]');
  if (defaultActive) defaultActive.classList.add("active");


  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");

      // Hide all sections
      sections.forEach(section => {
        section.style.display = "none";
      });

      // Show the selected section
      const activeSection = document.getElementById(target);
      if (activeSection) {
        activeSection.style.display = "block";
      }

// Remove active class from all links
      links.forEach(link => link.classList.remove("active"));
      // Add active class to clicked link
      link.classList.add("active");
    });
  });
});
function sendMessage() {
  const userInput = document.getElementById("userInput").value;

  const userMsg = document.createElement("div");
  userMsg.textContent = `You (${getCurrentTime()}): ${userInput}`;
  userMsg.style.textAlign = "right";
  userMsg.style.margin = "10px";

  const botMsg = document.createElement("div");
 botMsg.textContent = `Bot (${getCurrentTime()}): ${generateBotReply(userInput)}`;
  botMsg.style.textAlign = "left";
  botMsg.style.margin = "10px"; 
userMsg.className = "user-message";
botMsg.className = "bot-message";

  const chatbox = document.getElementById("chatbox");
  localStorage.setItem("chatHistory", chatbox.innerHTML);
  chatbox.appendChild(userMsg);
  chatbox.appendChild(botMsg);

  document.getElementById("userInput").value = ""; 
  
chatbox.scrollTop = chatbox.scrollHeight;

}

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
// Listen for Enter key on the input box
document.getElementById("userInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});


// Restore chat history from localStorage if available
window.addEventListener("load", () => {
  const savedChat = localStorage.getItem("chatHistory");
  if (savedChat) {
    document.getElementById("chatbox").innerHTML = savedChat;
  }
  if (!username) {
  askForName();
} else {
  const chatbox = document.getElementById("chatbox");
  const greet = document.createElement("div");
  greet.className = "bot-message";
  greet.textContent = `Welcome back, ${username}!`;
  chatbox.appendChild(greet);
  localStorage.setItem("chatHistory", chatbox.innerHTML);
}

});
function clearChat() {
  localStorage.removeItem("chatHistory");
  document.getElementById("chatbox").innerHTML = "";
}
function getCurrentTime() {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
}
let username = localStorage.getItem("chatUsername");

function askForName() {
  const name = prompt("Hi! What's your name?");
  if (name && name.trim() !== "") {
    username = name.trim();
    localStorage.setItem("chatUsername", username);
    const chatbox = document.getElementById("chatbox");

    const welcome = document.createElement("div");
    welcome.className = "bot-message";
    welcome.textContent = `Nice to meet you, ${username}! Ask me anything.`;
    chatbox.appendChild(welcome);
    localStorage.setItem("chatHistory", chatbox.innerHTML);
  } else {
    askForName(); // Ask again if blank
  }
}
