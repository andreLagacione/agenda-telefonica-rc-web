import React, { createContext, useCallback, useState, useContext } from 'react';
import ConfirmModal from '../base/confirm/confirm';
import { ConfirmModel } from '../base/confirm/confirm.model';

interface ConfirmContextData {
    addConfirm(item: ConfirmModel): void;
    confirmAction(itemId: string): void;
    removeConfirm(): void;
    idConfirmedItem: string;
    controlRemove: boolean;
}

const ConfirmContext = createContext<ConfirmContextData>({} as ConfirmContextData);

const ConfirmProvider: React.FC = ({ children }) => {
    const [confirmation, setConfimation] = useState<ConfirmModel>({} as ConfirmModel);
    let [idConfirmedItem, setIdConfirmedItem] = useState<string>('');
    let [controlRemove, setControlRemove] = useState<boolean>(false);

    const addConfirm = useCallback(({ itemId, title, message, visible }: ConfirmModel) => {
        setConfimation({ itemId, title, message, visible });
        setControlRemove(false);
    }, []);

    const confirmAction = useCallback((itemId: string) => {
        setIdConfirmedItem(itemId);
    }, []);

    const removeConfirm = useCallback(() => {
        setControlRemove(true);
    }, []);

    return <ConfirmContext.Provider value={{ addConfirm, confirmAction, removeConfirm, idConfirmedItem, controlRemove }}>
        {children}
        <ConfirmModal item={confirmation}></ConfirmModal>
    </ConfirmContext.Provider>
}

function useConfirm(): ConfirmContextData {
    return useContext(ConfirmContext);
}

export { ConfirmProvider, useConfirm };