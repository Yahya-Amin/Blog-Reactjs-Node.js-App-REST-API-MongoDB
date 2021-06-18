


import TopBar from './components/topBar/TopBar'
import Login from './pages/login/Login';
import Register from './pages/Resgister/Register';
import Single from './pages/single/Single.jsx';
import Write from './pages/write/Write';
import Home from './pages/Home/Home';
import Settings from './pages/settings/Settings'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useContext } from 'react';
import Context from './context/Context';



function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar/>
      <Switch>
      <Route exact path="/">
          < Home/>
      </Route>
      <Route path="/Register">
          {user ? <Home/> : < Register/>}
      </Route>
      <Route path="/Login">
      {user ? <Home/> : < Login/>}
      </Route>
      <Route path="/Write">
      {user ? <Write/> : < Register/>}
      </Route>
      <Route path="/Settings">
      {user ? <Settings/> : < Register/>}
      </Route>
      <Route path="/Post/:postId">
          < Single/>
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
