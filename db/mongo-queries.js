'use strict';

//Display all notes
db.notes.find();


//display all pretty
db.notes
  .find()
  .pretty();

//All notes displaying 'title' and 'content'
db.notes
  .find(
    {},{'title':1, 'content':1}
  ).pretty();

//Exclude the id
db.notes
  .find(
    {},{'_id':0, 'title':1, 'content':1}
  ).pretty();

//Display only title and sort by ID ALL notes
db.notes
  .find({},
    {'_id':0, 'title':1})
  .sort({'_id': -1})
  .pretty();

//Display all with the title '5 life lessons...'
db.notes
  .find({'title': {$regex :'5 life lessons learned from cats'}})
  .pretty();

//Display the first 5 notes
db.notes
  .find()
  .sort({'_id':1})
  .limit(5)
  .pretty();

//Display the 5 AFTER the first 5
db.notes
  .find()
  .sort({'_id':1})
  .skip(5)
  .limit(5)
  .pretty();

//Total number of notes
db.notes
  .find()
  .count();

//ISODate("2018-01-01")
//display docs created after jan 01 2018
db.notes
  .find({
    createdAt: {$gt: ISODate('2018-01-01')}})
  .pretty();

//notes updated between jan 01 and now
db.notes
  .find({'updatedAt': {$gte: ISODate('2018-01-01'),
    $lte: new Date()}});

//Display notes less than or equal to "now"
db.notes
  .find({'createdAt': {$lte: new Date()}});

//display ONE doc
db.notes
  .findOne()
  .pretty();

//Display only title of one
db.notes
  .findOne({}, {title: 1});

//Insert a note
db.notes
  .insertOne(
    {title: 'A title for the insert'},
    {content: 'and then some content'}
  );

//Insert two notes
db.notes
  .insertMany([
    {title: 'note1', content:'content1'},
    {title: 'note2', content:'content2'}
  ]);


//Change title and content where id is ....03
db.notes
  .findAndModify({
    query: {'_id': '000000000000000000000003'},
    update:{'title': 'Whatever', 'content':'you like'}
  });

//modify only the title where id is ...07
db.notes
  .findAndModify({
    query: {'_id': '000000000000000000000007'},
    update: {title:'title has been changed'}
  });

//modify all notes created after jan 01 2018
db.notes
  .findAndModify({
    query: {createdAt: {$gt: ISODate('2018-01-01')}},
    update: {title: 'all notes', content:'must now conform'}
  });

//remove the title where id is ...08
db.notes
  .update(
    {_id:'000000000000000000000008'},
    {$unset:{title:1}}
  );

//Remove content from notes created before "now"
db.notes
  .update(
    {updatedAt:{$lte: new Date()}},
    {$unset:{content:''}});


//Remove all titles updated before jan 01 2018
db.notes
  .update(
    {updatedAt:{$lte: ISODate('2018-01-01')}},
    {$unset: {title: 1}});

//Remove the note whose id is ...017
db.notes
  .remove({_id: ObjectId('000000000000000000000017')});

//remove the notes updated before jan 01 2018
db.notes
  .remove({
    updatedAt: {$lte: ISODate('2018-01-01')}});

//remove notes created after jan 01 2018 with 'dogs' in the title
db.notes
  .deleteMany({
    createdAt: {$gte: ISODate('2018-01-01')},
    title:{$regex : '.*dogs.*'}});

//Display all notes that do not have a title
db.notes
  .find({title:null});

//remove notes that contain 'cat' but not 'read'
db.notes
  .deleteMany({
    title: {$regex: '.*cats.*',$not:/read/}});

//Display all notes whose titles do not contain 'dogs' while having a title
db.notes
  .find(
    {title:{$not:/dogs/}},
    {title:1});