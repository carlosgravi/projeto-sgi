import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const Header = () => {
    const history = useHistory();
    return (
            <nav className="navbar">
                <ul className="navbar-items">
                    <li className="navbar-logo">SGI</li>
                    <li className="navbar-item" onClick={() => history.push("/map")}>Mapa</li>
                    <li className="navbar-item" onClick={() => history.push("/companies")}>Empresas</li>
                    <li className="navbar-item" onClick={() => history.push("/products")}>Produtos</li>
                    <li className="navbar-item" onClick={() => history.push("/stored")}>Estoque</li>
                    <li className="navbar-item" onClick={() => history.push("/")}>Logout</li>
                </ul>
            </nav>
    )
}

export default Header;