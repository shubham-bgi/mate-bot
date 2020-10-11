const express = require('express');
const model = require('../model');
const router = express.Router()

router.get('/', async(req,res) => {
    try{
            const bases = await model.Base.find()
            res.json(bases);
    }
    catch(err){
        res.send('Error' + err)
    }
})


router.get('/:id', async(req,res) => {
    try{
        const base = await model.Base.findById(req.params.id)
        res.json(base);
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.post('/', async(req,res) =>{
    const base = new model.Base({
        discordId: req.body.discordId,
        bases: req.body.bases
    })

    try{
        const b1 = await base.save()
        res.json(b1)
    }catch(err){
        console.log(err);
        res.send('Error')
    }
})


router.patch('/:id', async(req,res) =>{
    try{
        const base = await model.Base.findById(req.params.id)
        console.log(base);
        base.discordId = req.body.discordId
        const b1 = await base.save()
        res.json(b1)
    }catch(err){
        console.log(err);
        res.send('Error')
    }
})

router.delete('/:id', async(req,res) =>{
    try{
        const base = await model.Base.findById(req.params.id)
        const b1 = await base.remove()
        res.send('Deleted')
    }catch(err){
        console.log(err);
        res.send('Error')
    }
})

module.exports = router;