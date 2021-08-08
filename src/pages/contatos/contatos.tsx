import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import Table from '../../base/table/table.styles';
import TitleComponent from '../../base/title/title';
import FirebaseService from '../../utils/firebase.utils';
import { FiEdit, FiTrash, FiUserPlus, FiSearch } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Contact } from '../../base/contact/contact.model';
import { Spinner, Container } from './contatos.styles';
import Form from '../../base/form/form.styles';

const Contatos: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [contactIdDeleting, setContactIdDeleting] = useState<string>('');
    let timeoutControl: any;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = (query = '') => {
        setLoading(true);

        FirebaseService
            .getDataList('contatos', query)
            .then(
                querySnapshot => getContacts(querySnapshot)
            )
            .catch(
                _error => toast.error('Erro ao obter os contatos', _error)
            )
            .finally(
                () => setLoading(false)
            );
    }

    const getContacts = (querySnapshot: any) => {
        const data: Contact[] = [];
        querySnapshot.forEach((doc: any) => {
            data.push({ ...doc.data() });
        });

        setContacts(data);
    }

    const removeContact = (contact: Contact) => {
        const confirmation = window.confirm(`Você tem certeza que deseja remover o contato ${contact.phone}?`);

        if (confirmation) {
            setDeleting(true);
            setContactIdDeleting(contact._id);

            FirebaseService
                .removeData('contatos', contact._id)
                .then(
                    _response => {
                        toast.success('Contato removido!');
                        loadContacts();
                    },
                )
                .catch(
                    _error => toast.error('Erro ao remover contato', _error)
                )
                .finally(
                    () => {
                        setDeleting(false);
                        setContactIdDeleting('');
                    }
                );
        }
    }

    const handleSearchContact = useCallback((query: string | undefined, event: FormEvent | InputEvent) => {
        event.preventDefault();

        if (timeoutControl) {
            clearTimeout(timeoutControl);
        }
        
        timeoutControl = setTimeout(() => {
            console.log(query);
            loadContacts(query);
        }, 300);
    }, []);

    return (
        <Container className="d-flex flex-column overflow-hidden">
            <div className="d-flex justify-content-between align-items-center flex-grow-0">
                <div className="d-flex justify-content-between align-items-center w-50">
                    <TitleComponent title="Contatos" />
                </div>

                <div className="d-flex justify-content-between align-items-center w-50">
                    <Form withoutLabel className="flex-grow-1 w-100">
                        <form onSubmit={event => handleSearchContact(inputRef?.current?.value, event)}>
                            <div className="position-relative">
                                <input
                                    type="text"
                                    name="search"
                                    className="form-control"
                                    placeholder="Pesquisar contato por nome ou telefone"
                                    ref={inputRef}
                                    onChange={event => handleSearchContact(event.target.value, event)}
                                />

                                <span
                                    className="icon"
                                >
                                    <FiSearch size={20} color="#ccc" />
                                </span>
                            </div>
                        </form>
                    </Form>

                    <Link to="/contatos/criar" type="button" className="btn btn-primary btn-add-contact ml-4 flex-grow-0">
                        <FiUserPlus size={18} className="mr-3" />
                        Add contato
                    </Link>
                </div>
            </div>

            {
                loading
                ?
                <Spinner className="d-flex justify-content-center p-5 mt-4 h-100 align-items-center">
                    <FaSpinner size={50} className="loader" color="#fff" />
                </Spinner>
                :
                <div className="d-flex flex-column flex-grow-1 h-100">
                    {
                        !contacts.length
                        ?
                        <div className="alert alert-info mt-4">
                            Nenhum contato foi encontrado!
                        </div>
                        :
                        <Table className="flex-grow-1 overflow-auto w-100 mt-4">
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
                                                    <td>{item.name}</td>
                                                    <td>{item.phone}</td>
                                                    <td className="col-acoes">
                                                        <Link to={`/contatos/${item._id}`} type="button" className="btn btn-primary btn-sm">
                                                            <FiEdit />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm ml-4"
                                                            onClick={() => removeContact(item)}
                                                        >
                                                            {
                                                                deleting && contactIdDeleting === item._id
                                                                ?
                                                                <FaSpinner className="loader" />
                                                                :
                                                                <FiTrash />
                                                            }
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </Table>
                    }
                </div>
            }
            <ToastContainer />
        </Container>
    );
}

export default Contatos;