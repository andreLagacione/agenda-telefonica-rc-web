import React from 'react';
import TableComponent from '../../base/table/table';
import TitleComponent from '../../base/title/title';

const Contatos: React.FC = () => {
    return (
        <>
            <TitleComponent title="Contatos" />
            <TableComponent />
        </>
    );
}

export default Contatos;