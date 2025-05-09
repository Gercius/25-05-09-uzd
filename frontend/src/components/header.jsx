import { Link, useNavigate } from "react-router-dom";
import "../styles/base/header.scss";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Header() {
    const { token, logout } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container">
                    <Link className="logo-title" to="/">
                        Hotel IS
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Pagrindinis
                                </Link>
                            </li>
                            {isLoggedIn ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={handleLogout}>
                                        Atsijungti
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Prisijungti
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Registracija
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
