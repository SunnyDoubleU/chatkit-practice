import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home"

import { ChatkitProvider, TokenProvider } from '@pusher/chatkit-client-react';
import Login from './pages/Login';
const tokenProvider = new TokenProvider({
  url: process.env.REACT_APP_CHATKIT_TOKEN
});
const instanceLocator = process.env.REACT_APP_CHATKIT_INSTANCE

require('dotenv').config();

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
}

export default App;
