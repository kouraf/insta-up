import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Header from './component/Header';
import Feed from './component/Feed';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/">
          <Feed />
        </Route>
        <Route exact path="/user/:userId">
          <Feed />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
