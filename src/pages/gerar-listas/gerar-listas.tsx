import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ContactsList } from '../../base/contact/contact.model';
import TitleComponent from '../../base/title/title';
import FirebaseService from '../../utils/firebase.utils';
import Link from './gerar-listas.styles';

const GerarListas: React.FC = () => {
    const [contacts, setContacts] = useState<string[]>([]);
    const [itemsPerList, setItemsPerList] = useState<string>('');
    const [contactsList, setContactsList] = useState<ContactsList[]>([]);

    useEffect(() => {
        FirebaseService.getDataList('contatos')
            .then(querySnapshot => getContacts(querySnapshot));
    }, []);

    const getContacts = (querySnapshot: any) => {
        const data: string[] = [];
        querySnapshot.forEach((doc: any) => {
            data.push(doc.data().phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '0$1 $2-$3'));
        });

        setContacts(data);
    }

    const listGenerate = () => {
        const totalOfList = Math.ceil(contacts.length / parseFloat(itemsPerList));
        const list = [];
        let control = 0;

        for (let i = 0; i < totalOfList; i++) {
            list.push({value: [] as string[]});

            for (let j = 0; j < parseFloat(itemsPerList); j++) {
                if (control >= contacts.length) {
                    break;
                }

                list[i].value.push(contacts[control]);
                control++;
            }
        }

        setContactsList(list);
    }

    const copyValue = (values: string[] | undefined) => {
        if (!values || !values.length) {
            toast.error('Não existem telefones nesta lista!');
            return;
        }

        const number = values.reduce((x, y) => x += ', ' + y);
        navigator.clipboard.writeText(number).then(() => {
            toast.success('Números copiados!');
        }, (error) => {
            toast.error('Erro ao copiar os números', error);
        });
    }

    return (
        <>
            <TitleComponent title="Gerar Listas" />

            <form className="p-3 alert alert-dark mt-4">
                <div className="d-flex align-items-end">
                    <div className="w-25">
                        <label className="form-label d-block mb-2">Digite a quantidade de contatos por lista</label>
                        <input
                            type="number"
                            name="total"
                            className="form-control"
                            value={itemsPerList}
                            onChange={e => setItemsPerList(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary ml-3"
                        disabled={!itemsPerList || parseFloat(itemsPerList) <= 0}
                        onClick={() => listGenerate()}
                    >
                        Gerar listas
                    </button>
                </div>

                <div className="row">
                    {
                        contactsList.map((item, index) => {
                            return (
                                <div className="col-4 mt-4" key={index}>
                                    <div className="alert alert-info d-flex justify-content-between align-items-center">
                                        <div className="d-flex flex-column">
                                            <strong className="font-weight-bold mb-2">Lista { index + 1 }</strong>
                                            <div>{item.value ? item.value.length : ''} contato(s)</div>
                                        </div>

                                        <Link>
                                            <div className="link" onClick={() => copyValue(item.value)}>Copiar contatos</div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </form>
            
            <ToastContainer />
        </>
    );
}

export default GerarListas;