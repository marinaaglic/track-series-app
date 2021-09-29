import React, {useState, useContext} from 'react';
import AuthService from '../services/AuthService';
import Message from '../components/Message';
import {AuthContext} from '../context/AuthContext';
import {withRouter} from 'react-router-dom';
import {Container,AppBar,Typography,Grid,Paper,ListItem,ListItemText, List, Divider, TextField,Button} from "@material-ui/core";

const Login = (props) => {
    const [user, setUser] = useState({username: "", password: ""});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        e.preventDefault();
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/serije');
            }
            else{
                setMessage(message);
            }
        })
    }

    return (
        <div className="loginDiv">
            <Grid container>
            
            <Grid item xs={6} className="gridLog">
            <form onSubmit={onSubmit} autoComplete="off" noValidate className="forma">
                <Paper className="papir">
                <h3> Please sign in:</h3>
                <label htmlFor="username" className="sr-only">Username:</label>
                <TextField 
                    type="username"
                    onChange={onChange}
                    name = "username"
                    variant="outlined"
                    label ="Username"
                    fullWidth
                    />
                    
                    <br></br><br></br>
                <label htmlFor="password" className="sr-only">Password:</label>
                <TextField 
                    type="password"
                    onChange={onChange}
                    name = "password"
                    variant="outlined"
                    label ="Password"
                    fullWidth
                    />
                    <br></br><br></br>
                <Button variant="contained" color="primary" size="small" type="submit">Login</Button>
                {/* <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Login</button> */}
            </Paper>
            </form>
            {message ? <Message message={message}/> : null}
            </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Login);
