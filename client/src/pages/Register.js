
import { useState } from 'react';
import { register } from '../services/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            alert('Реєстрація успішна');
        } catch (error) {
            console.error('Помилка реєстрації:', error);
            const errorMessage = error.response?.data?.message || 'Сталася помилка';
            alert('Помилка: ' + errorMessage);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Пароль" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Зареєструватися</button>
        </form>
    );
};

export default Register;