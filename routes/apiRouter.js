let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Dish = require('../db/schema.js').Dish


apiRouter.post('/dishes', function(req, res){
  // we create a new instance of mongoose model called newDish using the new Dish schema constructor
  // mongoose is to server and database as backbone is to client and server
  let newDish = new Dish(request.body) 
  newDish.save(function(err){
    if(err){
      res.send(err)
    }
    else {
      res.json(newDish)
    }
  })
})

apiRouter.get('/dishes', function(req, res){
  // req.query parses the parameter string (e.g. tag = chinese) and turns it into an object. we can add multiple parameter string
  Dish.find(req.query, function(err, records){
      if(err) return res.json(err) 
        res.json(records)
  })
})

apiRouter.get('/user/dishes', function(req, res){
  Dish.find({authorId: request.user._id}, function(err, records){
      if(err){
        res.send(err)
      }
      else {
        res.json(records)
      }
  })
})


//////////////////////////////////////////////////////////////////
//USERS  
/////////////////////////////////////////////////////////////////
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err) 
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    // Routes for a Model(resource) should have this structure


module.exports = apiRouter