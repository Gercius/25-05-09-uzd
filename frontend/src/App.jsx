import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthContext";
import { HotelProvider } from "./context/HotelContext";
import Header from "./components/header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Hotel from "./pages/Hotel";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/base/global.css";

function App() {
    return (
        <LoadingProvider>
            <AuthProvider>
                <HotelProvider>
                    <Router>
                        <div className="app-container">
                            <Header />
                            <main className="content">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/*" element={<NotFound />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/hotels" element={<Hotels />} />
                                    <Route path="/hotel/:id" element={<Hotel />} />
                                </Routes>
                            </main>
                        </div>
                    </Router>
                </HotelProvider>
            </AuthProvider>
        </LoadingProvider>
    );
}

export default App;
