import React from 'react'
import {Button} from "@material-ui/core";

const Serija = ({serija, promjenaGledanosti}) => {
    const oznaka = serija.pogledano
    ? 'Watched' : 'Not watched'
  return (
      <li className="serija">{serija.naziv}
        <Button variant="contained" color="primary" size="small" onClick={promjenaGledanosti}>  {oznaka} </Button>
    </li>
  
    
  )
}
 
export default Serija;