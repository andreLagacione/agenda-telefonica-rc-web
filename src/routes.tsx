import { Switch, Route } from "react-router-dom";
import Contatos from './pages/contatos/contatos';
import CreateContact from './pages/contatos/create';
import GerarListas from './pages/gerar-listas/gerar-listas';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Contatos} />
            <Route path="/contatos" exact component={Contatos} />
            <Route path="/contatos/criar" exact component={CreateContact} />
            <Route path="/contatos/:id" exact component={CreateContact} />
            <Route path="/gerar-listas" exact component={GerarListas} />
        </Switch>
    );
}

export default Routes;
