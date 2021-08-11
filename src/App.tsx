import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyles } from './styles/global';
import { AppComponent, Asside, Main } from './styles/app.styles';
import Sidebar from './base/sidebar/sidebar';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AppProvider>
          <AppComponent>
            <Asside>
              <Sidebar />
            </Asside>

            <Main>
              <Routes />
            </Main>
          </AppComponent>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
