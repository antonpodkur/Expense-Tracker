import './App.css';
// import {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import Welcome from './components/Welcome';

function App() {
  // const [logged, setLogged] = useState(false);

  // useEffect(()=>{
  //     if(localStorage.getItem('token')) setLogged(true);
  // },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Welcome />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/change-password" component={ChangePassword}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}


const PrivateRoute = (props) =>{

    let logged = false;
    if(localStorage.getItem('token')) logged = true;
    else logged = false;

    return  logged ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        (<Redirect  to="/"  />);
};


export default App;
