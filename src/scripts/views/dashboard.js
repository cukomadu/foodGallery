import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'

const Dashboard = React.createClass({

	getInitialState: function(){
		return DISH_STORE.getData()
	},

	componentWillMount: function(){
		ACTIONS.fetchDishes()
		DISH_STORE.on('updateContent', () => {
			this.setState(DISH_STORE.getData())
		})
	},

	componentWillUnmount: function(){
		DISH_STORE.off('updateContent')
	},

	_handleSearch: function(evt){
		if(evt.keyCode === 13){
			ACTIONS.fetchDishes(evt.target.value)
			evt.target.value = ""
		}
	},

	render: function() {
	 	return (
	 		<div className='dashboard' >
	 			<Header />
	 			<h3>dashboard</h3>
	 			<input onKeyDown = {this._handleSearch} type="text" placeholder="Search for a Tag" />
	 			<DishContainer dishColl={this.state.collection}/>
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({
	render: function() {
		return (
			<div className="dishContainer">
				{this.props.dishColl.map(
					(model) => <Dish key={model.cid} dishModel={model} />
				)}
			</div>
			)
	}
})

const Dish = React.createClass({

	_handleLikes: function(){
		ACTIONS.likeDish(this.props.dishModel, User.getCurrentUser())
	},

	render: function() {
		return (
			<div className="dish">
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
				<span>{this.props.dishModel.get('rating')}</span>
				<p>tags:{this.props.dishModel.get('tags')}</p>
				<img src={this.props.dishModel.get('imageUrl')} />
				<button onClick={this._handleLikes}>Like</button>
				<p>Likes: {this.props.dishModel.get('likes').length}</p>
			</div>
			)
	}
})

export default Dashboard
