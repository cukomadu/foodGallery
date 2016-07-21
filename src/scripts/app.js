import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LoginView from './views/loginView'

//Api Key - AwiKcYMD9QNOLulFmXWZPz


const app = function() {
	const AppRouter = Backbone.Router.extend({
		routes: {
			"home": "showHome",
			"dish/postDishes": "showPostDishes",
			"dish/myDishes": "showMyDishes",
			"login": "showLogin",
			"*catchall": "showHome"
		},

		showHome: function(){
			ReactDOM.render(<Dashboard />, document.querySelector('.container'))
		},

		showPostDishes: function(){
			ReactDOM.render(<ComposeView />, document.querySelector('.container'))
		},

		showMyDishes: function(){
			ReactDOM.render(<DishesView />, document.querySelector('.container'))
		},

		showLogin: function(){
			ReactDOM.render(<LoginView />, document.querySelector('.container'))
		},

		initialize: function(){
		// you can use initialize to protect some routes from some users. so only registered users see and do certain things

			Backbone.history.start()
		}
	})

	new AppRouter()

 
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..