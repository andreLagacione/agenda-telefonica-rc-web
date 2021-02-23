import React, { useState } from 'react';
import Form from '../../base/form/form.styles';
import { phoneMask } from '../../base/masks/phone';
import TitleComponent from '../../base/title/title';
import { phoneValidator } from '../../base/validators/phone';

const CreateContact: React.FC = () => {
    const [nome, setNome] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [isPhoneValid, setIsPhoneValid] = useState<boolean>();
    let title = 'Criar contato';

    const getPhoneMask = (value: string) => {
        const masked = phoneMask(value);
        setTelefone(masked);
        validatePhone();
    }

    const validatePhone = () => {
        const isValid = phoneValidator(telefone);
        setIsPhoneValid(isValid);
    }

    const saveContact = () => {
        console.log(nome, telefone);
    }

    return (
        <>
            <TitleComponent title={title} />

            <Form className="p-3 alert alert-dark mt-4">
                <form>
                    <div className="row">
                        <div className="col-sm-6">
                            <label className="form-label d-block mb-2">Telefone *</label>
                            <input
                                type="tel"
                                name="telefone"
                                className={ isPhoneValid === true ? 'form-control' : 'form-control border-danger' }
                                placeholder="(99) 9 9999-9999"
                                maxLength={16}
                                value={telefone}
                                onChange={(e: any) => getPhoneMask(e.target.value)}
                                onBlur={() => validatePhone()}
                            />
                        </div>

                        <div className="col-sm-6">
                            <label className="form-label d-block mb-2">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                className="form-control"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
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
        </>
    );
}

export default CreateContact;