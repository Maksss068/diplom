import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
useEffect(() => {
const token = localStorage.getItem('token');
if (token) {
axios.get('http://localhost:5000/api/auth/profile', {
headers: { Authorization: `Bearer ${token}` }
})
.then((res) => setUser(res.data))
.catch(() => logout());
}
}, []);
const login = (token) => {
localStorage.setItem('token', token);
setUser({ token });
};
const logout = () => {
localStorage.removeItem('token');
setUser(null);
};
return (
<AuthContext.Provider value={{ user, login, logout }}>
{children}
</AuthContext.Provider>
);
};