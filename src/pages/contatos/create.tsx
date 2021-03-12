import React, { useEffect, useState } from 'react';
import Form from '../../base/form/form.styles';
import { phoneMask } from '../../base/masks/phone';
import TitleComponent from '../../base/title/title';
import { phoneValidator } from '../../base/validators/phone';
import FirebaseService from '../../utils/firebase.utils';
import { Contact } from './contatos';
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, useParams } from 'react-router-dom';
import { DocumentData } from '@firebase/firestore-types';

const CreateContact: React.FC = () => {
    const history = useHistory();
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [validationMessage, setValidationMessage] = useState<string>('');
    const [backupPhone, setBackupPhone] = useState<string>('');
    const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
    const [isPhoneTouched, setIsPhoneTouched] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let { id }: { id: string } = useParams();
    let title = id ? 'Editar Contato' : 'Criar contato';

    useEffect(() => {
        getPhoneMask(phone);
    }, [phone]);

    useEffect(() => {
        if (id) {
            getContatctById();
        }
    }, [id]);

    const getPhoneMask = (value: string) => {
        if (!value) {
            return;
        }
        
        const masked = phoneMask(value);
        setPhone(masked);

        if (backupPhone !== phone) {
            validatePhone();
        }
    }

    const validatePhone = () => {
        const isValid = phoneValidator(phone);
        const message = isValid ? '' : 'Telefone inválido.';
        setIsPhoneValid(isValid);
        setValidationMessage(message);

        if (isValid) {
            setIsLoading(true);
            checkIfPhoneExists();
        } else {
            setIsLoading(false);
        }
    }

    const checkIfPhoneExists = () => {
        if(phone.length) {
            FirebaseService.findByField('contatos', 'phone', '==', phone)
                .then(
                    data => {
                        setIsLoading(false);

                        if (!data.empty) {
                            setIsPhoneValid(false);
                            setValidationMessage('Este telefone já foi cadastrado.');
                        }
                    }
                );
        }
    }

    const submitForm = () => {
        const value: Contact = {
            _id: id || '',
            name: name || '-',
            phone,
        };

        if (id) {
            updateContact(value);
        } else {
            createContact(value);
        }
    }

    const createContact = (contact: Contact) => {
        const ref = FirebaseService.createDocReference('contatos');
        contact._id = ref.id;

        ref.set(contact).then(
            _response => {
                toast.success('Contato criado!');
                clearStates();
            },
            _error => toast.error('Erro ao criar contato', _error),
        );
    }

    const updateContact = (contact: Contact) => {
        FirebaseService.saveData('contatos', id, contact)
            .then(
                _response => {
                    toast.success('Contato atualizado!');
                    clearStates();

                    setTimeout(() => {
                        history.goBack();
                    }, 1000);
                },
                _error => toast.error('Erro ao atualizar contato', _error),
            );
    }

    const clearStates = () => {
        setName('');
        setPhone('');
        setValidationMessage('');
        setIsPhoneValid(false);
        setIsPhoneTouched(false);
    }

    const getContatctById = () => {
        FirebaseService.findByField('contatos', '_id', '==', id)
            .then(
                (data: DocumentData) => {
                    setIsLoading(false);
                    const doc = data.docs[0].data();
                    setBackupPhone(doc.phone);
                    setPhone(doc.phone);
                    setName(doc.name);
                    setValidationMessage('');
                    setIsPhoneValid(true);
                }
            );
    };

    return (
        <>
            <TitleComponent title={title} />

            <Form className="p-3 alert alert-dark mt-4">
                <form>
                    <div className="row">
                        <div className="col-sm-6 relative">
                            <label className="form-label d-block mb-2">Telefone *</label>
                            <input
                                type="tel"
                                name="telefone"
                                className={ isPhoneTouched && !isPhoneValid ? 'form-control border-danger' : 'form-control' }
                                placeholder="(99) 9 9999-9999"
                                maxLength={16}
                                value={phone}
                                onChange={(e: any) => setPhone(e.target.value)}
                                onFocus={() => setIsPhoneTouched(true)}
                            />

                            <small className="validate-message text-danger mt-1 d-block">{ validationMessage }</small>
                            <span
                                className="icon"
                                hidden={ !isLoading }
                            >
                                <ClipLoader color="#222" loading={true} size={18} />
                            </span>
                        </div>

                        <div className="col-sm-6">
                            <label className="form-label d-block mb-2">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                className="form-control"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                        <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Voltar</button>
                        <button
                            type="button"
                            className="btn btn-primary ml-3"
                            onClick={() => submitForm()}
                            disabled={!isPhoneValid || isLoading}
                        >Salvar</button>
                    </div>
                </form>
            </Form>

            <ToastContainer />
        </>
    );
}

export default CreateContact;