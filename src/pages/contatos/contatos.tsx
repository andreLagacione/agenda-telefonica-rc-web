import React, { useEffect, useState } from 'react';
import Table from '../../base/table/table.styles';
import TitleComponent from '../../base/title/title';
import FirebaseService from '../../utils/firebase.utils';
import { FiEdit, FiTrash, FiUserPlus } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Contact } from '../../base/contact/contact.model';

const Contatos: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        FirebaseService.getDataList('contatos')
            .then(querySnapshot => getContacts(querySnapshot));
    }, []);

    const getContacts = (querySnapshot: any) => {
        const data: Contact[] = [];
        querySnapshot.forEach((doc: any) => {
            data.push({...doc.data()});
        });

        setContacts(data);
    }

    const removeContact = (contact: Contact) => {
        const confirmation = window.confirm(`Você tem certeza que deseja remover o contato ${contact.phone}?`);

        if (confirmation) {
            FirebaseService.removeData('contatos', contact._id).then(
                _response => {
                    toast.success('Contato removido!');
                    FirebaseService.getDataList('contatos')
                        .then(querySnapshot => getContacts(querySnapshot));
                },
                _error => toast.error('Erro ao remover contato', _error),
            );
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <TitleComponent title="Contatos" />

                <Link to="/contatos/criar" type="button" className="btn btn-primary">
                    <FiUserPlus size={18} className="mr-3" />
                    Add contato
                </Link>
            </div>

            <Table>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th className="col-acoes">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            contacts.map(item => {
                                return (
                                    <tr key={item._id}>
                                        <td>{ item.name }</td>
                                        <td>{ item.phone }</td>
                                        <td className="col-acoes">
                                            <Link to={`/contatos/${item._id}`} type="button" className="btn btn-primary btn-sm">
                                                <FiEdit />
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm ml-4"
                                                onClick={() => removeContact(item)}
                                            >
                                                <FiTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </Table>

            <ToastContainer />
        </>
    );
}

export default Contatos;