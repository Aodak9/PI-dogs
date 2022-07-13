// const { Router } = require("express");
// const { appDogs, getAPIDogs } = require("./allDogs");
// const { appTemperaments } = require("./temperaments");
// const { Temperament, conn } = require("../db.js");
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');

// async function getTemperaments() {
//   let result = await getAPIDogs();
//   result = result.data
//   if (result.length > 0) {
//     let temperaments = [];
//     result.forEach((d) => {
//       if (d.temperament)
//         d.temperament.split(", ").forEach((t) => temperaments.push(t));
//     });
//     temperaments = temperaments.filter(
//       (t, index) => temperaments.indexOf(t) === index
//     );
//     temperaments = temperaments.map(t => {
//         return {
//             name: t
//         }
//     })
//     console.log(temperaments.length + " temperaments loaded")
//     return temperaments;
//   } else {
//     console.log("Error loading temperaments " + result);
//     return [];
//   }
// }
// (async function loadTemperaments() {
//       temperaments = await getTemperaments();
//       Temperament.bulkCreate(temperaments)
//     })()



// const router = Router();

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);

// router.use("/dogs", appDogs);
// router.use("/temperaments", appTemperaments);

// module.exports = router;

const { default: axios } = require('axios');

const { Router } = require('express');
//const temperamentRouter = require('./temperament')

//const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { v4: uuidv4 } = require('uuid');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    API_KEY
} = process.env;

//const fetch = require("node-fetch")
//const fetch = require("node-fetch");
//const { UUIDV4 } = require('sequelize/types');
//const { UUID } = require('sequelize/types');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
    //console.log(apiUrl, "Linea 1")
    const apiInfo = await apiUrl.data.map(breed => {
        return {
            id: breed.id,
            name: breed.name,
            image: breed.image.url,
            height: breed.height.metric,
            weight: breed.weight.metric,
            temperament: breed.temperament,
            years: breed.life_span,
            sexo: breed.sexo,
        }
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    console.log(dbInfo, "Linea 58")
    const dogModify = dbInfo.map(e => {
        return {
            id: e.id,
            name: e.name,
            height: e.height,
            weight: e.weight,
            image: e.image,
            years: e.years,
            temperament: e.Temperaments.map(e => {
                return e.name
            })
        }
    })
    const infoTotal = apiInfo.concat(dogModify);
    return infoTotal;
}

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    if (name) {
        let dogName = await dogsTotal.filter(breed => breed.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
            res.status(200).json(dogName) :
            res.status(404).send('No esta el Dog, lo siento');
    } else {
        res.status(200).json(dogsTotal)
    }
})

//router.use('/temperament', temperamentRouter);
const unicos = [];
router.get('/temperament', async (req, res) => {
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
    const tempsInfo = await temperamentsApi.data.map(breed => breed.temperament)
    dbtemps = tempsInfo.toString().split(', ');

    var unicos = dbtemps.filter((item, index) => {
        return dbtemps.indexOf(item) === index
    })


    unicos.forEach(breed => {
        Temperament.findOrCreate({
            where: {
                name: breed
            }
        })
    })

    const allTemperaments = await Temperament.findAll();
    return res.status(200).send(allTemperaments)
})

router.post('/dogs', async function (req, res) {
    const { name, image, height, weight, years, temperament, sexo } = req.body;
    //console.log(req.body)
    try {
        let newDog = await Dog.create({
            id: uuidv4(),
            name,
            image,
            height,
            weight,
            years,
            sexo,
            //createdInDb,
        })
        //console.log(newDog)

        let result = await newDog.addTemperament(temperament)
        res.status(200).json(result)

    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/dogs/:id', async (req, res) => {

    const { id } = req.params;
    //const dogsTotal = await getAllDogs()
    let dogDB;
    try {
        if (typeof id === "string" && id.length >= 10) {
            let dogCreated = await Dog.findByPk(id, {
                include: Temperament
            })
            dogDB = {
                name: dogCreated.name,
                image: dogCreated.image,
                height: dogCreated.height,
                weight: dogCreated.weight,
                years: dogCreated.years,
                temperament: dogCreated.Temperaments.map(el => {
                    return el.name
                })
            }
            console.log(dogDB.temperament, "Linea 147")

            /*dogCreated.length ?
                res.status(200).json(dogId) :
                res.status(404).send('No encontré el Dog')*/

        } else {
            var results = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
            var dogsApi = results.data
            console.log(dogsApi, "Linea 30")

            console.log(dogsApi[0].id, "Linea 159")

            var Apidog = dogsApi.find(elem => parseInt(elem.id) === parseInt(id))
            //var UniDog = Apidog.flat();

            console.log(Apidog, "Linea 31")

            dogDB = {
                name: Apidog.name,
                image: Apidog.image.url,
                height: Apidog.height.metric,
                weight: Apidog.weight.metric,
                years: Apidog.life_span,
                temperament: Apidog.temperament.split(',')
            }
            console.log(dogDB.temperament, "Linea 32")
        }
        res.json(dogDB)
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;










