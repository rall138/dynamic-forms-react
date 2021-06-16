import DynamicForms from './DynamicForms'
import DynamicFormTabs from './DynamicFormTabs'
import Login from './Login'
import ToolsAndProperties from './ToolsAndProperties'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css'
import { transactionMode } from './files/constantes';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/forms'>
          <DynamicForms />
        </Route>
        <Route path='/forms/:id/edit'>
          <DynamicFormTabs mode={transactionMode.UPDATE} />
        </Route>
        <Route path='/forms/new'>
          <DynamicFormTabs mode={transactionMode.NEW} />
        </Route>
        <Route path='/forms/:form_id/sections/:id/edit'>
          <ToolsAndProperties />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
