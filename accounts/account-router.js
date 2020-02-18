const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log('something failed', err)
        })
});

router.get('/:id', (req, res) => {
    //db.select('posts').where({id: req.params.id})
    db('accounts').where({ id: req.params.id })
    .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => { 
            console.log('something went wrong', err)
            res.status(500).json({ message: 'failed' })
        })
});

router.post('/', validateAccount, (req, res) => {
    db('accounts').insert(req.body, 'id')
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => { 
            console.log('something went wrong', err)
            res.status(500).json({ message: 'failed' })
        })
});

router.put('/:id', validateAccount, (req, res) => {
    db('accounts').where({id: req.params.id}).update(req.body)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => { 
            console.log('something went wrong', err)
            res.status(500).json({ message: 'failed' })
        })
});

router.delete('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id }).del()
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => { 
            console.log('something went wrong', err)
            res.status(500).json({ message: 'failed' })
        })
});

function validateAccount(req, res, next) {
    console.log(`middleware validate project ${req.body.budget} ${req.body.name}`)
    if(!req.body.budget || !req.body.name){
        res.status(400).json({ message: 'Account does not have a budget or a name' })
    }else{
      next()
    }
}

module.exports = router