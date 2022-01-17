const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Pokemon, Type} = require ('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`);
    const apiData = apiUrl.data.results.map(x => {
        return {
            name: x.name,
            url: x.url,
        };
    })

    var allPokemon = [];

    for(pokemon of apiData){
        // console.log(pokemon)
    var apiInfo = await axios.get(`${pokemon.url}`);
        allPokemon.push({
            id: apiInfo.data.id,
            name: apiInfo.data.name,
            image: apiInfo.data.sprites.front_default,
            imageDetail: apiInfo.data.sprites.other.dream_world.front_default,
            hp: apiInfo.data.stats[0].base_stat,
            attack: apiInfo.data.stats[1].base_stat,
            defense: apiInfo.data.stats[2].base_stat,
            speed: apiInfo.data.stats[5].base_stat,
            height: apiInfo.data.height,
            weight: apiInfo.data.weight,
            type: apiInfo.data.types.map(x => x.type.name)
        })
    }
    return allPokemon

    // var info = []
    // for(let i =1; i < 40; i++){
    //     var apiInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    //     info.push({
    //         id: apiInfo.data.id,
    //         name: apiInfo.data.name,
    //         image: apiInfo.data.sprites.front_default,
    //         hp: apiInfo.data.stats[0].base_stat,
    //         attack: apiInfo.data.stats[1].base_stat,
    //         defense: apiInfo.data.stats[2].base_stat,
    //         speed: apiInfo.data.stats[5].base_stat,
    //         height: apiInfo.data.height,
    //         weight: apiInfo.data.weight,
    //         type: apiInfo.data.types.map(x => x.type.name)
    //     })
    // }
    // return info
}

const getDbInfo =  async () => {

    let search = await Pokemon.findAll({
        include:
        {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    return search
}

const getAllPokemon = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}

router.get(`/pokemon`, async(req, res) =>{
    const name = req.query.name

    let findPokemon = await getAllPokemon();
    if(name){
        let pokemonName = await findPokemon.filter(x => x.name.toLowerCase().includes(name.toLowerCase()))
        pokemonName.length ?
        res.status(200).send(pokemonName):
        res.status(404).send('No esta el Pokemon');

    }

    else{
        res.status(200).send(findPokemon)
    }

})

router.get('/type', async (req, res) =>{
    const typeApi = await axios.get('https://pokeapi.co/api/v2/type')
    const types = typeApi.data.results.map(x => x.name)

    // console.log(types)

    types.forEach(x => {
        Type.findOrCreate({
            where: {name: x}
        })
    });
    const allTypes = await Type.findAll();
    res.send(allTypes);
})

router.post('/pokemon', async (req, res) =>{
    let {name,
        image, 
        attack, 
        defense, 
        speed, 
        height, 
        weight, 
        type, 
        createdInDb
    } = req.body

    let pokemonCreated = await Pokemon.create({
        name,
        image, 
        attack, 
        defense, 
        speed, 
        height, 
        weight, 
        type, 
        createdInDb
    })

    let typeDb = await Type.findAll({
        where: {name: type}
    })

    pokemonCreated.addType(typeDb)

    res.send('Pokemon creado')
})

router.get('/pokemon/:id', async (req, res)=>{
    const {id} = req.params
    const findPokemon = await getAllPokemon()
    if(id){
        let pokemonId = await findPokemon.filter(x => x.id == id)
        pokemonId.length ?
        res.status(200).send(pokemonId):
        res.status(404).send('No esta el Pokemon');

    }
})

module.exports = router;
