import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyles } from './styles/global';
import { AppComponent, Asside, Main } from './styles/app.styles';
import Sidebar from './base/sidebar/sidebar';
import Contatos from './pages/contatos/contatos';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <AppComponent>
        <Asside>
          <Sidebar />
        </Asside>

        <Main>
          <Contatos />
        </Main>
      </AppComponent>
    </>
  );
}

export default App;
