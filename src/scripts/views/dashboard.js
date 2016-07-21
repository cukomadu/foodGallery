import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'

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

	render: function() {
	 	return (
	 		<div className='dashboard' >
	 			<Header />
	 			<h3>dashboard</h3>
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
	render: function() {
		return (
			<div className="dish">
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
				<img src={this.props.dishModel.get('imageUrl')} />
			</div>
			)
	}
})

export default Dashboard
