import React, { useState } from 'react';
import Form from '../../base/form/form.styles';
import { phoneMask } from '../../base/masks/phone';
import TitleComponent from '../../base/title/title';
import { phoneValidator } from '../../base/validators/phone';
import FirebaseService from '../../utils/firebase.utils';
import { Contact } from './contatos';
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

const CreateContact: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [validationMessage, setValidationMessage] = useState<string>('');
    const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
    const [isPhoneTouched, setIsPhoneTouched] = useState<boolean>(false);
    let title = 'Criar contato';

    const getPhoneMask = (value: string) => {
        const masked = phoneMask(value);
        setPhone(masked);
        validatePhone();
    }

    const validatePhone = () => {
        const isValid = phoneValidator(phone);
        const message = isValid ? '' : 'Telefone inválido.';
        setIsPhoneValid(isValid);
        setValidationMessage(message);
    }

    const saveContact = () => {
        const value: Contact = {
            _id: '',
            name: name || '-',
            phone,
        };

        FirebaseService.createData<Contact>('contatos', value).then(
            _response => {
                toast.success('Contato criado!');
                setName('');
                setPhone('');
                setIsPhoneValid(false);
                setIsPhoneTouched(false);
            },
            _error => toast.error('Erro ao criar contato', _error),
        )
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
                                onChange={(e: any) => getPhoneMask(e.target.value)}
                                onFocus={() => setIsPhoneTouched(true)}
                                onBlur={() => validatePhone()}
                            />

                            <small className="validate-message text-danger mt-1 d-block">{ validationMessage }</small>
                            <span className="icon">
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
                        <button type="button" className="btn btn-secondary">Voltar</button>
                        <button
                            type="button"
                            className="btn btn-primary ml-3"
                            onClick={() => saveContact()}
                            disabled={!isPhoneValid}
                        >Salvar</button>
                    </div>
                </form>
            </Form>

            <ToastContainer />
        </>
    );
}

export default CreateContact;