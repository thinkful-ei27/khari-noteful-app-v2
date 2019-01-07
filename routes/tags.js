'use strict';

const express = require('express');
const knex = require('../knex');

const router = express.Router();

router.get('/',(req, res, next)=>{
  const { searchTerm } = req.query;

  knex('tags')
    .select('tags.id', 'name')
    .modify(function (queryBuilder){
      if (searchTerm){
        queryBuilder.where('name', 'like', `%${searchTerm}%`);
      }
    })
    .orderBy('tags.id')
    .then(results =>{
      console.log(JSON.stringify(results, null, 2));
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next)=>{
  const id = req.params.id;

  knex('tags')
    .select('tags.id', 'name')
    .where('tags.id', id)
    .orderBy('id')
    .then(results => console.log(results[0]))
    .catch(err => console.log(err));
});

router.put('/:id',(req, res, next)=>{
  const idUp = req.params.id;

  const updateObj = {};
  const updateableFields = ['name'];

  if('name' in req.body){
    updateObj['name'] = req.body['name'];
  }

  if(!updateObj.name){
    const err = new Error('Missing `name` in request body');
    err.status = 404;
    return next(err);
  }

  knex('tags')
    .where({id: idUp})
    .update(updateObj, ['name'])
    .then(results => console.log(results))
    .catch(err => console.log(err));
});

router.post('/', (req, res, next)=>{
  const { name } = req.body;

  if(!name){
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex('tags')
    .insert(newItem)
    .returning(['id', 'name'])
    .then((results)=>{
      const result = results[0];
      res.json(result);        
    })
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next)=>{
  const id = req.params.id;

  knex('tags')
    .where('tags.id', id)
    .del()
    .then(results => console.log(res.status(204)))
    .catch(err => console.log(err));
});


module.exports = router;