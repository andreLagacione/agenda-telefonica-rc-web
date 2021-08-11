import React from 'react';
import { ConfirmProvider } from './confirm';

const AppProvider: React.FC = ({ children }) => (
    <ConfirmProvider>{children}</ConfirmProvider>
);

export default AppProvider;