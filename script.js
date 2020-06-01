const socket = io("https://test-server-js-odczik.herokuapp.com")
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")

const name = prompt("Username")
appendMessage("You joined")
socket.emit("new-user", name)

socket.on("chat-message", data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on("user-connected", name => {
    appendMessage(`${name} Connected`)
})

socket.on("user-disconnected", name => {
    appendMessage(`${name} Disconnected`)
})

messageForm.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit("send-chat-message", message)
    messageInput.value = ""
})

function appendMessage(message) {
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageContainer.append(messageElement)
}