import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from '../models/models'
import ReactFilepicker from 'react-filepicker'

const ComposeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className="composeView" >
	 			<Header />
	 			<h3>post a dish!</h3>
	 			<DishPostingForm />
	 		</div>
	 	)
 	}
})

const DishPostingForm = React.createClass({

	_handleCompose: function(e){
		e.preventDefault()
		ACTIONS.saveDish({
			title: e.currentTarget.title.value,
			description: e.currentTarget.description.value,
			location: e.currentTarget.location.value,
			rating: e.currentTarget.rating.value,
			authorId: User.getCurrentUser()._id,
			authorEmail: User.getCurrentUser().email,
			imageUrl: this.url ? this.url: '../assets/images/empty-plate.jpg'
		})
	},

	_handleImage: function(result){
		console.log(result)
		this.url = result.url // create a url property on the component
	},


	render: function() {
		return (
			<div className="dishPostingForm">
				<form onSubmit={this._handleCompose}>
					<input type="text" name="title" placeholder="Enter Dish Title"/>
					<textarea type="text" name="description" placeholder="Enter Dish Description"></textarea>
					<input type="text" name="location" placeholder="Enter The Location"/>
					<input type="text" name="rating" />
					<ReactFilepicker apikey="AwiKcYMD9QNOLulFmXWZPz" onSuccess={this._handleImage}/>
					<button type="submit">SUBMIT</button>
				</form>

			</div>
			)
	}
})

export default ComposeView
