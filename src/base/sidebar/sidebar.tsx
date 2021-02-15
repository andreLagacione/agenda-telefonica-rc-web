import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiMenu, FiUsers, FiList } from 'react-icons/fi';
import { Nav } from './sidebar.styles';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <Nav>
            <header className="d-flex p-3 align-items-center text-white">
                <span className="icon flex-grow-0 cursor-pointer">
                    <FiMenu size={22} />
                </span>
                <h2 className="text pl-3 text-truncate flex-grow-1">Menu</h2>
            </header>

            <ul>
                <li>
                    <Link to="/contatos" className="p-3 d-flex" title="Cadastrar contato">
                        <span className="icon flex-grow-0">
                            <FiUsers size={18} />
                        </span>
                        <span className="text pl-3 text-truncate flex-grow-1">Contatos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/gerar-listas" className="p-3 d-flex" title="Gerar listas">
                        <span className="icon flex-grow-0">
                            <FiList size={18} />
                        </span>
                        <span className="text pl-3 text-truncate flex-grow-1">Gerar listas</span>
                    </Link>
                </li>
            </ul>
        </Nav>
    );
}

export default Sidebar;