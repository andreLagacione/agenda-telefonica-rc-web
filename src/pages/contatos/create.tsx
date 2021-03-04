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

const CreateContact: React.FC = () => {
    const history = useHistory();
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [validationMessage, setValidationMessage] = useState<string>('');
    const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
    const [isPhoneTouched, setIsPhoneTouched] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let { id }: { id: string } = useParams();
    let title = id ? 'Editar Contato' : 'Criar contato';

    useEffect(() => {
        getPhoneMask(phone);
    }, [phone]);

    const getPhoneMask = (value: string) => {
        if (!value) {
            return;
        }
        
        const masked = phoneMask(value);
        setPhone(masked);
        validatePhone();
    }

    const validatePhone = () => {
        const isValid = phoneValidator(phone);
        const message = isValid ? '' : 'Telefone inválido.';
        setIsPhoneValid(isValid);
        setValidationMessage(message);

        if (isValid) {
            setIsLoading(true);
            checkByKeyAndValue();
        } else {
            setIsLoading(false);
        }
    }

    const checkByKeyAndValue = async () => {
        if(phone.length) {
            FirebaseService.findByPhone('contatos', phone);
            // FirebaseService.getDataList<Contact>('contatos', filterContacts);
        }
    }

    const filterContacts = (data: Contact[]) => {
        const filtered = data.filter(item => item.phone === phone);
        setIsLoading(false);

        if (filtered.length) {
            setValidationMessage('Este telefone já foi cadastrado.');
            setIsPhoneValid(false);
        }
    }

    const submitForm = () => {
        const value: Contact = {
            _id: '',
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
        FirebaseService.createData<Contact>('contatos', contact).then(
            _response => {
                toast.success('Contato criado!');
                clearStates();
            },
            _error => toast.error('Erro ao criar contato', _error),
        );
    }

    const updateContact = (contact: Contact) => {

    }

    const clearStates = () => {
        setName('');
        setPhone('');
        setValidationMessage('');
        setIsPhoneValid(false);
        setIsPhoneTouched(false);
    }

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