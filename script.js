async function sendMessage() {
  let input = document.getElementById("user-input");
  let message = input.value.trim();
  if (!message) return;

  let chatBox = document.getElementById("chat-box");

  // Show user message
  chatBox.innerHTML += `<div class="message user">You: ${message}</div>`;

  // Send message to backend
  let response = await fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message })
  });

  let data = await response.json();

  // Show bot reply
  chatBox.innerHTML += `<div class="message bot">Bot: ${data.reply}</div>`;

  // Scroll down
  chatBox.scrollTop = chatBox.scrollHeight;

  input.value = "";
}
