import React, { useState, useEffect,Fragment } from 'react'
import ReactDOM from 'react-dom'
import Serija from '../src/components/Serija';
import serijeServer from '../src/services/serije'
import {Container,AppBar,Typography,Grid,Paper,ListItem,ListItemText, List, Divider, TextField,Button} from "@material-ui/core";
import '../src/index.css';
import NavBar from '../src/components/NavBar';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'; 
import Login from '../src/components/Login';
import Registration from '../src/components/Registration';
import Series from '../src/components/Series';
import PrivateRoute from '../src/hocs/PrivateRoute';
import UnPrivateRoute from '../src/hocs/unPrivateRoute';
import serije from '../src/services/serije';


function App () {
    return(
       
        <Router>
            <NavBar/>
            <Switch>
            <UnPrivateRoute path="/register">
                <Registration/>
            </UnPrivateRoute>
            <PrivateRoute path="/serije">
                <Series/>
            </PrivateRoute>
            <Route path="/">
                <Login/>
            </Route>
            </Switch>
        </Router>
        
    )
}
export default App;