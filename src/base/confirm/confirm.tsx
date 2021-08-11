import React, { useEffect, useState } from 'react';
import { Confirm, Overlay } from './confirm.styles';
import { FaTimes } from 'react-icons/fa';
import { ConfirmModel } from './confirm.model';
import { useCallback } from 'react';
import { useConfirm } from '../../hooks/confirm';

interface ConfirmContainerProps {
    item: ConfirmModel;
}

const ConfirmModal: React.FC<ConfirmContainerProps> = ({ item }) => {
    const [controlVisibiliity, setControlVisibiliity] = useState<boolean>(false);
    const { confirmAction, controlRemove } = useConfirm();

    useEffect(() => {
        setControlVisibiliity(item.visible);
    }, [item]);

    useEffect(() => {
        if (controlRemove) {
            setControlVisibiliity(false);    
        }
    }, [controlRemove]);

    const handleCloseConfirm = useCallback(() => {
        setControlVisibiliity(false);
    }, []);

    const handleConfirmAction = () => {
        confirmAction(item.itemId);
    };

    return (
        <>
            <Overlay visible={controlVisibiliity}></Overlay>

            <Confirm visible={controlVisibiliity}>
                <div className="container">
                    <header className="header d-flex justify-content-between">
                        <h2 className="title">{item?.title}</h2>

                        <span className="btn-remove d-flex justify-content-center align-items-center" onClick={handleCloseConfirm}>
                            <FaTimes size={22} color="fff" />
                        </span>
                    </header>

                    <div className="content d-flex flex-column justify-content-center align-items-center">
                        <div className="text">{item?.message}</div>

                        <div className="d-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-danger mx-2" onClick={handleConfirmAction}>Confirmar</button>
                            <button type="button" className="btn btn-primary mx-2" onClick={handleCloseConfirm}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </Confirm>
        </>
    )
};

export default ConfirmModal;
