const mongoose = require('mongoose')
const supertest = require('supertest')
const Serija = require('../models/serija')
const app = require('../app')
const api = supertest(app)

const pocetneSerije = [
    {
        naziv: "Winx",
        pogledano: false,
        broj_sezona: 1,
        broj_epizoda: 10
    },
    {
        naziv: "Friends",
        pogledano: false,
        broj_sezona: 10,
        broj_epizoda: 24
    }
]

beforeEach( async () => {
    await Serija.deleteMany({})
    let objektSerija = new Serija(pocetneSerije[0])
    await objektSerija.save()
    objektSerija = new Serija(pocetneSerije[1])
    await objektSerija.save()
  })

test('Serije se vraćaju kao JSON', async () =>{
    await api
    .get('/serije')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test ('Baza ima tocno 2 serije', async () => {
    const odgovor = await api.get('/serije')
    expect(odgovor.body).toHaveLength(2);
})

test ('Provjera sadrzaja', async () => {
    const odgovor = await api.get('/serije')
    const sadrzaj = odgovor.body.map(s => s.sadrzaj)
    expect(sadrzaj).toContain('Winx')
})

test ('Dodavanje ispravne serije', async () => {
    const nova = {
        naziv: 'Testna serija',
        pogledano: false,
        broj_sezona: 10,
        broj_epizoda: 5
    }

    await api
    .post('/serije')
    .send(nova)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const odgovor = await api.get('/serije')
    const sadrzaj = odgovor.body.map(s => s.sadrzaj)
    expect(odgovor.body).toHaveLength(pocetneSerije.length+1);
    expect(sadrzaj).toContain('Testna serija')
})

afterAll( () => {
    mongoose.connection.close();
})