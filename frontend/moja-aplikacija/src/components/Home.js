import React from 'react';
import {Container,AppBar,Typography,Grid,Paper,ListItem,ListItemText, List, Divider, TextField,Button} from "@material-ui/core";

const Home = () =>{
    return (
        <div>
            <Grid container className="gridHome">
                <Grid item xs={6} className="formaZaDodavanje" className="gridReg">
                    <form autoComplete="off" noValidate className="forma">
                        <h2> Welcome to track your series</h2>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;