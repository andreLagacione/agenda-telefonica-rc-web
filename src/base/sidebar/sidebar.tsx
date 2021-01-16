import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiMenu } from 'react-icons/fi';
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
                    <a href="#" title="Cadastrar contato">Cadastrar contato</a>
                </li>
                <li>
                    <a href="#" title="Gerar listas">Gerar listas</a>
                </li>
            </ul>
        </Nav>
    );
}

export default Sidebar;