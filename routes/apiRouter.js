let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User

let Dish = require('../db/schema.js').Dish //STEP THREE (import schema)

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

//STEP FOUR (build your server side apiroutes)

//this route will create a brand new dish that we will put in the db
apiRouter.post('/dishes', function(request, response) {
  // we create a new instance of mongoose model called newDish using the new Dish schema constructor
  // mongoose is to server and database as backbone is to client and server
    let dish = new Dish(request.body) //create new instance of schema from a MONGOOSE model, request.body is all the information that we have taken from the client side and we send it on the body of the request to the server
    dish.save(function(error) { //saves to db
        if(error) {
            response.send(error)
        }
        else {
            response.json(dish)
        }
    })
})

//this route will show us all the dishes posted by all users
// req.query parses the parameter string (e.g. tag = chinese) and turns it into an object. we can add multiple parameter string
apiRouter.get('/dishes', function(request, response) {
    Dish.find(request.query, function(error, records){  //some methods live directly on the model, so you don't need to create a new instance.
    // request.query parses the parameters and turns them into an object (at this moment we have it just in case)
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
})

//get dishes posted by the logged in user
apiRouter.get('/user/dishes', function(request, response) {
    Dish.find({authorId: request.user._id}, function(error, records) { //I want to get all dishes where the author id matches the current id of the user
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
})

apiRouter.put('/dishes/:_id', function(req, resp){
  Dish.findByIdAndUpdate(req.params._id, req.body, function(err, records){
               if(err){
               resp.send(err)
           }
           else{
               resp.json(records)
           }

       })
   })

module.exports = apiRouter