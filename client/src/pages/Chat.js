import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Отримуємо попередні повідомлення з сервера
    axios.get('http://localhost:5000/api/chat/messages')
      .then((res) => setMessages(res.data.reverse())) // Відображаємо повідомлення в правильному порядку
      .catch((err) => {
        console.error('Помилка отримання повідомлень:', err);
        setError('Не вдалося завантажити повідомлення');
      });

    // Отримуємо нові повідомлення через WebSocket
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]); // Додаємо нові повідомлення в кінець
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return; // Запобігаємо відправці порожнього повідомлення

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Ви не авторизовані');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/chat/send',
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket.emit('sendMessage', response.data); // Відправляємо тільки збережене повідомлення з сервера
      setMessage('');
    } catch (err) {
      console.error('Помилка відправки повідомлення:', err);
      setError('Не вдалося відправити повідомлення');
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.length === 0 ? (
          <p>Немає повідомлень</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index}>
              <b>{msg.user_id || 'Анонім'}:</b> {msg.message}{' '}
              <i>({new Date(msg.created_at).toLocaleTimeString()})</i>
            </div>
          ))
        )}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введіть повідомлення..."
      />
      <button onClick={sendMessage}>Відправити</button>
    </div>
  );
};

export default Chat;
