'use strict';

const express = require('express');
const knex = require('../knex');

const router = express.Router();

router.get('/', (req,res,next)=>{
  const { searchTerm } = req.query;

  knex
    .select('folders.id', 'name')
    .from('folders')
    .modify(function (queryBuilder){
      if (searchTerm){
        queryBuilder.where('name', 'like', `&${searchTerm}&`);
      }
    })
    .orderBy('folders.id')
    .then(results =>{
      console.log(JSON.stringify(results, null, 2));
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next)=>{
  const id = req.params.id;

  knex
    .select('folder.id', 'name')
    .from('folder')
    .where('folder.id', id)
    .orderBy('id')
    .then(results => console.log(results[0]))
    .catch(err => console.log(err));
});

router.put('/:id', (req, res, next)=>{
  const idUp = req.params.id;

  const updateObj = {};
  const updateableFields = ['name'];

  //   updateableFields.forEach(field =>{
  //     if(field in req.body){
  //       updateObj[field] = req.body[field];
  //     }
  //   });

  if('name' in req.body){
    updateObj['name'] = req.body['name'];
  }

  if(!updateObj.name){
    const err = new Error('Missing `name` in request body');
    err.status = 404;
    return next(err);
  }

  knex('folders')
    .where({id: idUp})
    .update(updateObj, ['name'])
    .then(results => console.log(results))
    .catch(err => console.log(err));
});


router.post('/', (req, res, next)=>{
  const { name } = req.body;

  const newItem = { name };

  if(!newItem.name){
    const err = new Error('Missing `name` of folder');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .insert(newItem, ['id', 'name'])
    .then(results => console.log(results))
    .catch(err => console.log(err));
});


router.delete('/:id', (req, res, next)=>{
  const id = req.params.id;

  knex('notes')
    .where('notes.id', id)
    .del()
    .then(results => console.log(res.status(204)))
    .catch(err => console.log(err));
});
module.exports = router;