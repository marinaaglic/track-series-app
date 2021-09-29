import React, {useState, useRef, useEffect} from 'react';
import AuthService from '../services/AuthService';
import Message from '../components/Message';
import { Route , withRouter} from 'react-router-dom';
import {Container,AppBar,Typography,Grid,Paper,ListItem,ListItemText, List, Divider, TextField,Button} from "@material-ui/core";

const Registration = (props) => {
    const [user, setUser] = useState({username : "", password : "", email : ""});
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() =>{
        return () => {
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e => {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = () => {
        setUser({username : "", password : "", email : ""});

    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const {message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=> {
                    props.history.push('/login');
                },2000);
            }
        })
    }

    return (
        <div className="regDiv">
                <Grid container className="gridRegistracija">
                <Grid item xs={6} className="formaZaDodavanje" className="gridReg">
                <form onSubmit={onSubmit} autoComplete="off" noValidate className="regForma"> 
                    <Paper className="papir">
                    <h3> Please register:</h3>
                    <label htmlFor="role" className="sr-only">E-mail:</label>
                    <TextField 
                    type="email"
                    value={user.email} 
                    onChange={onChange}
                    name = "email"
                    variant="outlined"
                    label ="E-mail"
                    fullWidth
                    />
                    
                    <br></br><br></br>
                    <label htmlFor="username" className="sr-only">Username:</label>
                    <TextField 
                    type="text"
                    value={user.username} 
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
                    value={user.password} 
                    onChange={onChange}
                    name = "password"
                    variant="outlined"
                    label ="Password"
                    fullWidth
                    />
                    <br></br><br></br>
                    <Button variant="contained" color="primary" size="small" type="submit">Register</Button>
                </Paper>
            </form>
            {message ? <Message message={message}/> : null}
            </Grid>
            </Grid>
                
        </div>
    )
}

export default withRouter(Registration);
