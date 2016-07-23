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

	getInitialState: function(){
		return {
			currentDishRating: 0
		}
	},

	_handleCompose: function(e){
		e.preventDefault()
		ACTIONS.saveDish({
			title: e.currentTarget.title.value,
			description: e.currentTarget.description.value,
			location: e.currentTarget.location.value,
			rating: this.state.currentDishRating,
			authorId: User.getCurrentUser()._id,
			authorEmail: User.getCurrentUser().email,
			imageUrl: this.url ? this.url: '/images/moi.png'
		})
	},

	_handleImage: function(result){
		console.log(result)
		this.url = result.url // create a url property on the component
	},

	_handleStar: function(evt){
		this.setState({
			currentDishRating: parseInt(evt.target.dataset.rating)
		})
	},

	_generateStarsJSX: function(ratingVal){
		var JSXStars = []
		for(var i = 1; i <= ratingVal; i++){
			let starStyle = {fontSize: 30}
			
			if(i <= ratingVal){
				starStyle.color = 'yellow'
			}

			let JSXStar = <span style={starStyle} data-rating={i} onClick={this._handleStar}>&#9734;</span>
			JSXStars.push(JSXStar)
		}
		return JSXStars
	},


	render: function() {
		return (
			<div className="dishPostingForm">
				<form onSubmit={this._handleCompose}>
					<input type="text" name="title" placeholder="Enter Dish Title"/>
					<textarea type="text" name="description" placeholder="Enter Dish Description"></textarea>
					<input type="text" name="location" placeholder="Enter The Location"/>
					{/*<input type="text" name="rating" />*/}
					{this._generateStarsJSX(this.state.currentDishRating)}
					<input type="text" name="tags" placeholder="Enter Dish Tags" />
					<ReactFilepicker apikey="AwiKcYMD9QNOLulFmXWZPz" onSuccess={this._handleImage}/>
					<button type="submit">SUBMIT</button>
				</form>

			</div>
			)
	}
})

export default ComposeView
