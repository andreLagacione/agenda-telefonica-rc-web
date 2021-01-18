import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiMenu, FiUsers, FiList } from 'react-icons/fi';
import { Nav } from './sidebar.styles';

const Sidebar: React.FC = () => {
    return (
        <Nav>
            <header className="d-flex p-3 align-items-center text-white">
                <FiMenu size={22} />
                <h2 className="ml-3">Menu</h2>
            </header>

            <ul>
                <li>
                    <a href="#" title="Cadastrar contato">
                        <FiUsers size={18} />
                        <span className="pl-3">Contatos</span>
                    </a>
                </li>
                <li>
                    <a href="#" title="Gerar listas">
                        <FiList size={18} />
                        <span className="pl-3">Gerar listas</span>
                    </a>
                </li>
            </ul>
        </Nav>
    );
}

export default Sidebar;