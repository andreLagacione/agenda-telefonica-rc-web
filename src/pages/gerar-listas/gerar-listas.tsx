import React, { useEffect, useState } from 'react';
import { Contact } from '../../base/contact/contact.model';
import TitleComponent from '../../base/title/title';
import FirebaseService from '../../utils/firebase.utils';
import Link from './gerar-listas.styles';

const GerarListas: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [itemsPerList, setItemsPerList] = useState<string>('');

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
                    >
                        Gerar listas
                    </button>
                </div>

                <div className="row">
                    <div className="col-4 mt-4">
                        <div className="alert alert-info d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                                <strong className="font-weight-bold mb-2">Lista 1</strong>
                                <div>250 contatos</div>
                            </div>

                            <Link>
                                <div className="link">Copiar contatos</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default GerarListas;