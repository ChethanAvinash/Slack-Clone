import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar'; 
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Chat from "./Components/Chat";
import React, {useState} from "react";
import Login from "./Components/Login";
import { useStateValue } from "./Providers/StateProvider";


function App() {
  const [{user},dispatch] = useStateValue();

  return (
    <div className="app">
      <Router>
        {
          !user ? (
            <Login/>
          ):
          <>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Switch>
                <Route path="/room/:roomName/:roomID">
                  <Chat />
                </Route>
                <Route path="/">
                  <h1>This is the Welcome Screen</h1>
                </Route>
              </Switch>
            </div>
          </>
        }
      </Router>
    </div>
  );
}

export default App;
