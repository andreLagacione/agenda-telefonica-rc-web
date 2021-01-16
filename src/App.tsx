import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyles } from './styles/global';
import { AppComponent, Asside } from './styles/app.styles';
import Sidebar from './base/sidebar/sidebar';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <AppComponent>
        <Asside>
          <Sidebar />
        </Asside>

        <main className="content d-flex flex-grow-1 h-100">
          
        </main>
      </AppComponent>
    </>
  );
}

export default App;
