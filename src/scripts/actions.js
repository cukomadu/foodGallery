

//STEP 6 (CREATE ACTIONS MODULE)

import {User, DishModel, DishCollection} from './models/models'
import DISH_STORE from './store'
import toastr from 'toastr'

console.log(toastr)

const ACTIONS = {

    //WE WANT TO LOG THE USER IN IMMEDIATELY AFTER THEY REGISTER (AS LONG AS THEY REGISTER SUCCESFULLY) THE FIRST METHOD REGISTERS AND THE SECOND LOGS THEM IN
    //.then takes two callback functions, both of these methods use that to create either a 'success' function or a 'failure' function
    registerUser: function(userObj) { //input name doesn't actually matter, we just named it the same as the object that is getting passsed in for our own peace of mind
        User.register(userObj).then( () => ACTIONS.logUserIn(userObj.email, userObj.password),
            (error) => {
                alert('FAILURE TO REGISTER')
                console.log(error)
            }
        )

    },

    logUserIn: function(email, password) {
        User.login(email, password).then(
            (responseData) => {
                toastr.success(`user ${email} logged in!`)
                console.log(responseData)
                location.hash = 'home' //want the page to re-route to the home page after successfull login
            },
            (error) => {
                toastr.error('FAILURE LOGGING IN')
                console.log(error)
            }
        )
    },

    logUserOut: function() { // we want the page to reroute to the login page after a user has logged out (server keeps track os user being logged in with a 'session')
        User.logout().then(
            () => location.hash = 'login'
        )
    },

    saveDish: function(dishObj){
        var dish = new DishModel(dishObj)
        dish.save().then(
            (responseData) => {
                alert('Thanks for submitting!')
                location.hash = 'home'
                console.log(responseData)
            },
            (error) => {
                alert('FAILURE')
                console.log(error)
            }
        )
    },

    fetchDishes: function(tags){
        DISH_STORE.data.collection.fetch({
            data: {
                tags: tags
            }
        })
    },

    likeDish: function(dish, userObj){
        console.log(dish.get('likes'))
       
        dish.set({
            likes: dish.get('likes').concat(userObj._id)
        })
        
        dish.save()
        DISH_STORE.data.collection.fetch()
    }
}

export default ACTIONS