// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // SECTION NAVIGATION (unchanged)
  const links = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll(".content-section");
  const defaultActive = document.querySelector('nav ul li a[data-section="home"]');
  if (defaultActive) defaultActive.classList.add("active");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.dataset.section;
      sections.forEach(s => s.style.display = s.id === target ? "block" : "none");
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // RESTORE CHAT HISTORY
  const saved = localStorage.getItem("chatHistory");
  if (saved) document.getElementById("chatbox").innerHTML = saved;

  // GREET USER OR ASK FOR NAME
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

  // ENTER KEY SUPPORT
  const inp = document.getElementById("userInput");
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  // Expose to window for onclick=…
  window.sendMessage = sendMessage;
  window.clearChat   = clearChat;
});

// SEND MESSAGE
function sendMessage() {
  const inputField = document.getElementById("userInput");
  const text = inputField.value.trim();
  if (!text) return;

  const chatbox = document.getElementById("chatbox");
  // user
  const um = document.createElement("div");
  um.className = "user-message";
  um.textContent = `You (${getCurrentTime()}): ${text}`;
  // bot
  const bm = document.createElement("div");
  bm.className = "bot-message";
  bm.textContent = `Bot (${getCurrentTime()}): ${generateBotReply(text)}`;

  chatbox.appendChild(um);
  chatbox.appendChild(bm);
  inputField.value = "";
  saveChat();
  chatbox.scrollTop = chatbox.scrollHeight;
}

// CLEAR CHAT
function clearChat() {
  localStorage.removeItem("chatHistory");
  document.getElementById("chatbox").innerHTML = "";
}

// SAVE CHAT
function saveChat() {
  localStorage.setItem("chatHistory", document.getElementById("chatbox").innerHTML);
}

// BOT LOGIC
function generateBotReply(input) {
  input = input.toLowerCase();
  if (input.includes("hello"))        return "Hi there!";
  if (input.includes("how are you"))  return "I'm just code, but I'm running smoothly!";
  if (input.includes("your name"))    return "I'm a simple bot Ace is building from scratch!";
  if (input.includes("what can you do")) return "Right now, I can respond to basic messages. But I'm learning!";
  if (input.includes("bye"))          return "Goodbye! Come chat with me again soon.";
  return "Beep boop 🤖… no clue what that means. Try again, maybe slower? 😂";
}

// TIME HELPER
function getCurrentTime() {
  const n = new Date();
  return `${n.getHours()}:${n.getMinutes().toString().padStart(2, "0")}`;
}

// ASK FOR NAME
function askForName() {
  const name = prompt("Hi! What's your name?");
  if (name && name.trim()) {
    localStorage.setItem("chatUsername", name.trim());
    const w = document.createElement("div");
    w.className = "bot-message";
    w.textContent = `Nice to meet you, ${name.trim()}! Ask me anything.`;
    document.getElementById("chatbox").appendChild(w);
    saveChat();
  } else {
    askForName();
  }
}
