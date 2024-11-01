async function sendMessageToChatbot(message) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    return data; // Yanıtı döndür
}

// Kullanıcı etkileşimi için örnek bir olay dinleyici
document.querySelector('.chat-input button').addEventListener('click', async () => {
    const inputField = document.querySelector('.chat-input input');
    const userMessage = inputField.value;
    inputField.value = '';

    // Kullanıcı mesajını göster
    const messagesContainer = document.querySelector('.chat-messages');
    messagesContainer.innerHTML += `<div>User: ${userMessage}</div>`;

    // Chatbot yanıtını al
    const botResponse = await sendMessageToChatbot(userMessage);
    messagesContainer.innerHTML += `<div>Chatbot: ${botResponse}</div>`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Aşağı kaydır
});