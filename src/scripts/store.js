import Backbone from 'backbone'
import _ from 'underscore'
import {DishCollection} from './models/models'

const DISH_STORE = _.extend(Backbone.Events, {

	data: {
		collection: new DishCollection() // create new instance of the collection here
	},

	emitChange: function(){
		this.trigger('updateContent')
	},

	getData: function(){ // getdata is used to set state for our collection. we will use it to get initial state
		//and set state// this return becomes the state
		return _.clone(this.data) // .clone is an underscore method

	},

	_initialize: function(){
		this.data.collection.on('sync update', this.emitChange.bind(this))
	}
})

DISH_STORE._initialize() //initializes the data before exporting the store. this initialize function is a custom initialize functin so we have
// set it off ourselves

export default DISH_STORE