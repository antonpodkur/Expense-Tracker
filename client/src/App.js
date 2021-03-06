import './App.css';
// import {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Statistics from './components/Statistics';

function App() {
  // const [logged, setLogged] = useState(false);

  // useEffect(()=>{
  //     if(localStorage.getItem('token')) setLogged(true);
  // },[])

  return (
    <div className="App" exact>
      <BrowserRouter>
        <Switch>
          <Route path="/welcome" exact>
            <Welcome />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <PrivateRoute path="/change-password" exact component={ChangePassword}/>
          <PrivateRoute path="/" exact component={Home}/>
          <PrivateRoute path="/statistics" exact component={Statistics}/>
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
        (<Redirect  to="/welcome"  />);
};


export default App;
