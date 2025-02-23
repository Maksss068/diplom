import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import VideoChat from './pages/VideoChat';
import Home from "./pages/Home";  

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Додаємо головну сторінку */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Захищені маршрути */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/video-chat" element={<VideoChat />} />
          </Route>

          {/* Якщо маршрут не знайдено */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
