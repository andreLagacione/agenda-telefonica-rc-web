import React from 'react';
import Table from './table.styles';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TableProps {
    columnsName: string[];
    data: object;
}

const TableComponent: React.FC = () => {
    return (
        <Table>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Teste</th>
                        <th>Teste</th>
                        <th>Teste</th>
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
    );
}

export default TableComponent;