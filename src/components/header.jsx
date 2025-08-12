import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/promises');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <header>
            <h1>PeaceDeal - омут памяти</h1>
            <nav>
                <ul>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/creation">Создать</Link></li>
                            <li><Link to="/promises">Обещания</Link></li>
                            <li>
                                <button onClick={handleLogout} className="logout-button">
                                    Выйти
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/promises">Обещания</Link></li>
                            <li>
                                <button onClick={handleLogin} className="login-button">
                                    Войти
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;