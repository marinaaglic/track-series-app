import React, {useState, useContext, useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import SeriesItem from '../components/SeriesItems';
import SeriesService from '../services/SeriesServices';
import serijeServer from '../services/serije';
import Message from './Message';
import {AuthContext} from '../context/AuthContext';
import Serija from '../components/Serija';
import {Container,AppBar,Typography,Grid,Paper,ListItem,ListItemText, List, Divider, TextField,Button} from "@material-ui/core";

const Series = (props) => {
    const [serija, setSerija] = useState({naziv: "", broj_sezona: "", broj_epizoda: ""});
    // const [sezona, setSezona]=useState({broj_sezona: ""});
    // const [epizoda, setEpizoda] = useState({broj_epizoda: ""});
    const [serije, setSerije] = useState([]);
    const [message,setMessage] = useState(null);
    const [ispisiSve, postaviIspis ] = useState(true)
    const authContext = useContext(AuthContext);


    useEffect(() => {
        SeriesService.getSerije().then(data => {
            setSerije(data.serije);
        })
    },[])

    const serijeZaIspis = ispisiSve
     ? serije 
     : serije.filter(serija => serija.pogledano === true)

    const onSubmit = e => {
        e.preventDefault();
        SeriesService.postSerija(serija).then(data => {
            const {message } = data;
            resetForm();
            if(!message.msgError){
                SeriesService.getSerije().then(getData => {
                    setSerije(getData.serije);
                    setMessage(message);
                });
            }
            else if(message.msgBody === "UnAuthorized"){
                setMessage(message);
                authContext.setUser({username : "", email : ""});
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(message);
            }
        });

    }

    // const onChange = e => {
    //     setSerija({naziv : e.target.value});
    // }

    const handleChange = (event) => {
        const {name,value} = event.target;
        setSerija((prevState) => {
            return {
                ...prevState,
                [name] : value,
            };
        });
    };

    const {naziv, broj_sezona, broj_epizoda} = serija;

    const resetForm = () => {
        setSerija({naziv : "", broj_sezona: "", broj_epizoda:""});
    }

    const promjenaGlednostiSerije = (id) => {
            const serija = serije.find(serija => serija.id === id)
            const novaSerija = {
            ...serija,
                pogledano: !serija.pogledano
            }
            SeriesService
            .putSerija(id,novaSerija)
            .then((response) => {
                setSerije(serije.map(serija => serija.id !== id ? serija : response.data))
            })
    }
        

    const brisiSeriju = (id) => {
        SeriesService
        .deleteSerija(id)
        .then (response => {
        setSerije(serije.filter(serija => serija.id !== id))
    })
}

    return (
        <div>
            <Container maxWidth="lg">
            <Grid container>
                <Grid item xs={5} className="formaZaDodavanje">
                    <Paper className="papir">
                        <h3>Add your series:</h3>
                        <form autoComplete="off" onSubmit={onSubmit} noValidate className="forma">
                            <TextField
                            name = "naziv" 
                            value={serija.naziv}
                            type="text"
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Series name..."
                            fullWidth>
                            </TextField>
                            <br></br>
                            <h3> Number of seasons: </h3>
                            <TextField 
                            name = "broj_sezona"
                            value={serija.broj_sezona}
                            type="number"
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Number of seasons..."
                            fullWidth>
                            </TextField>
                            <br></br>
                            <h3>Number of episodes: </h3>
                            <TextField 
                            name = "broj_epizoda"
                            value={serija.broj_epizoda}
                            type="number"
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Number of episodes..."
                            fullWidth>
                            </TextField>
                            <br></br><br></br>
                            <Button type="submit" variant="contained" color="primary" size="small">Add</Button>
                        </form>
                    </Paper>
                </Grid>

                <Grid item xs={5} className="formaZaGledanje">
                    <Paper className="papir">
                        <h3>Series you already added:</h3>
                <Button variant="contained" color="primary" size="small" 
                onClick={() => postaviIspis (!ispisiSve)}> Show {ispisiSve ? "watched" : "all"}
                </Button>
                <List>
                    {
                        serijeZaIspis && serijeZaIspis.map((serija,pos)=>{
                            return(
                                <React.Fragment key={pos}>
                                    <ListItem key={serija.id}>
                                        <ListItemText>
                                            <Typography variant="h5">
                                            <Serija 
                                            key={serija.id} 
                                            serija={serija} 
                                            promjenaGledanosti= {() => promjenaGlednostiSerije(serija.id)}/>
                                            </Typography>
                                            <br></br>
                                            <div>                                             
                                                <Button variant="contained" color="secondary" size="small" 
                                                onClick={()=> brisiSeriju(serija.id)}>Delete</Button>
                                            </div>
                                        </ListItemText>
                                    </ListItem>
                                    <Divider component="li"></Divider>
                                </React.Fragment>
                            )
                            
                        })
                    }
                </List>
                
                    </Paper>
                </Grid>
            </Grid>
        
            </Container>
        </div>
    )
}
export default Series;