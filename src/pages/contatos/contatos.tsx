import React from 'react';
import Table from '../../base/table/table.styles';
import TitleComponent from '../../base/title/title';
import FirebaseService from '../../utils/firebase.utils';

const Contatos: React.FC = () => {
    FirebaseService.getDataList('contatos').then(data => {
        console.log(data);
    });

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
                        <tr>
                            <td>Teste</td>
                            <td>Teste</td>
                            <td>Teste</td>
                        </tr>
                    </tbody>
                </table>
            </Table>
        </>
    );
}

export default Contatos;