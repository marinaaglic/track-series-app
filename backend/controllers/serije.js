const serijeRouter = require('express').Router()
const Serija = require('../models/serija')
 
serijeRouter.get('/', (req, res) => {
  Serija.find({}).then(rezultat => {    
    res.json(rezultat)
  })
})

serijeRouter.get('/:id', (req, res, next) => {
    Serija.findById(req.params.id)
      .then(serija => {
        if (serija) {
          res.json(serija)
        } else {
          res.status(404).end()
        }
   
      })
      .catch(err => next(err))
  })

serijeRouter.delete('/:id',(req,res,next) => {
    const id = req.params.id
    Serija.findByIdAndRemove(id).then(result => {
        res.status(204).end()
    })
        .catch(err => next(err))
})

serijeRouter.put('/:id',(req,res,next)=>{
    const id = req.params.id
    const podatak = req.body

    const serija = {
        naziv: podatak.naziv,
        pogledano: podatak.pogledano,
        broj_sezona: podatak.broj_sezona,
        broj_epizoda: podatak.broj_epizoda
    }

    Serija.findByIdAndUpdate(id, serija, {new: true}).then(serija => {
        res.json(serija)
        .catch(err => next(err))
    })
})

serijeRouter.post('/', (req,res,next) =>{
    const podatak = req.body
    const serija = new Serija({
        naziv: podatak.naziv,
        pogledano: podatak.pogledano || false,
        broj_sezona: podatak.broj_sezona,
        broj_epizoda: podatak.broj_sezona
    })

    serija.save().then(result => {
        console.log("Podatak spremljen!")
        res.json(result)
    })
    .catch(err => next(err))
})
 
module.exports = serijeRouter;