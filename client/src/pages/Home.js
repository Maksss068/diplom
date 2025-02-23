import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header>
        <h1>Допомога тим, хто постраждав від війни</h1>
        <nav>
          <ul>
            <li><a href="#about">Про нас</a></li>
            <li><a href="#services">Послуги</a></li>
            <li><a href="#contact">Контакти</a></li>
            <li><Link to="/login">Вхід</Link></li>
            <li><Link to="/register">Реєстрація</Link></li>
          </ul>
        </nav>
      </header>

      <section id="hero">
        <h2>Безкоштовні онлайн-консультації</h2>
        <p>Отримайте допомогу від фахівців у складний час</p>
        <Link to="/register" className="btn">Отримати допомогу</Link>
      </section>

      <section id="about">
        <h2>Про нас</h2>
        <p>Наша платформа надає психологічну, юридичну та соціальну допомогу постраждалим від війни.</p>
      </section>

      <section id="services">
        <h2>Наші послуги</h2>
        <ul>
          <li>Психологічна підтримка</li>
          <li>Юридичні консультації</li>
          <li>Допомога у працевлаштуванні</li>
          <li>Соціальна адаптація</li>
        </ul>
      </section>

      <section id="contact">
        <h2>Контакти</h2>
        <p>Email: support@helpua.org</p>
        <p>Телефон: +380 50 123 45 67</p>
      </section>

      <footer>
        <p>&copy; 2025 Допомога Україні. Усі права захищені.</p>
      </footer>
    </div>
  );
};

export default Home;

