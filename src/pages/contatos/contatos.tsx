import React, { useEffect, useState } from 'react';
import Table from '../../base/table/table.styles';
import TitleComponent from '../../base/title/title';
import FirebaseService from '../../utils/firebase.utils';
import { FiEdit, FiTrash } from 'react-icons/fi';

import { v4 as uuidv4 } from 'uuid';


interface Contact {
    id: string;
    name: string;
    phone: string;
}

const Contatos: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        FirebaseService.getDataList<Contact>('contatos', updateContacts);
    }, []);

    const updateContacts = (data: Contact[]) => {
        if (data?.length) {
            setContacts(data);
        }
    }

    return (
        <>
            <TitleComponent title="Contatos" />

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
                                    <tr key={item.id}>
                                        <td>{ item.name }</td>
                                        <td>{ item.phone }</td>
                                        <td className="col-acoes">
                                            <button type="button" className="btn btn-primary btn-sm">
                                                <FiEdit />
                                            </button>
                                            <button type="button" className="btn btn-danger btn-sm ml-4">
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
        </>
    );
}

export default Contatos;