const apiKey = 'YOUR_OPENAI_API_KEY'; // OpenAI API anahtarınızı buraya ekleyin

async function sendMessageToChatbot(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // veya kullanmak istediğiniz model
            messages: [{ role: 'user', content: message }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content; // Yanıtı döndür
}

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