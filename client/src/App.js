import './App.css';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
