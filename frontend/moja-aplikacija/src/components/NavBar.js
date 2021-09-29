import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import {AuthContext} from '../context/AuthContext';
import {AppBar,Typography,Toolbar,Button} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

const NavBar = (props) => {
    const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);

    const logoutHandler = () => {
        AuthService.logout().then(data => {
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
                props.history.push('/');
            }
        })
    }
    const unauthenticatedNavBar = () => {
        return (
            <AppBar position="static" className="appBar">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/"> Login</Button>
                    <Button color="inherit" component={Link} to="/register"> Register</Button>
                </Toolbar>
            </AppBar>
            
        )
    }
    const authenticatedNavBar = () => {
        return (
            <AppBar position="static" className="appBar2">
                <Toolbar>
                    <Button color="inherit" type="button" onClick={logoutHandler}>Logout</Button>
                </Toolbar>
                
            </AppBar>
            
        )
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                <AppBar position="static" color="inherit">
                <Typography
                    variant="h3"
                    align="center">
                    Track your series
                </Typography>
                </AppBar>
                </div>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
                {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
            </ul>
   
    </div>
    </nav>
    )
}

export default withRouter(NavBar);