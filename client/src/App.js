import React from 'react';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook'
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import {Loader} from './components/loader'
import './public/css/reset.css';


function App() {
  const {token, userId, login, logout, role, userName, userAvatar, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, role);
  if(!ready){
    return (<Loader/>)
  }
  return (
    <AuthContext.Provider value={{token, userId, login, logout, role, userName, userAvatar, isAuthenticated}}>
      <Router>
          {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
