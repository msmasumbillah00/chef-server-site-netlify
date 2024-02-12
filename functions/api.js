const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const cors = require("cors");


const chef = require("../data/chef.json");
const food = require("../data/items.json");


app.use(cors())

router.get('/chef', (req, res) => {
    res.send(chef)
})
router.get('/chef_recipes/:chefId', (req, res) => {
    const selectedChef = chef.find(c => c.id == req.params.chefId)
    res.send(selectedChef)
})
router.get('/recipies/:chefId', (req, res) => {
    const selectedRecipes = food.filter(c => c.chef_id == req.params.chefId)
    res.send(selectedRecipes)
})
router.get('/recipies', (req, res) => {
    res.send(food)
})
router.get('/featured_recipies', (req, res) => {
    const generateRandomNumbersArray = (min, max, count) => Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min)
    const randomNumbersArray = generateRandomNumbersArray(0, 76, 6);

    const featuredRecipies = food.filter(f => randomNumbersArray.includes(f.id))

    res.send(featuredRecipies)
})
router.get('/', (req, res) => {
    res.send('App is running..');
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);