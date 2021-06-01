import DynamicForms from './DynamicForms'
import DynamicFormTabs from './DynamicFormTabs'
import ToolsAndProperties from './ToolsAndProperties'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/forms'>
          <DynamicForms />
        </Route>
        <Route path='/forms/:id/edit'>
          <DynamicFormTabs />
        </Route>
        <Route path='/forms/:form_id/sections/:id/edit'>
          <ToolsAndProperties />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
