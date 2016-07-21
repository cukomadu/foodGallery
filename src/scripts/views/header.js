

import React from 'react'
import ACTIONS from '../actions'

const Header = React.createClass({
	render: function() {
		return (
			<div id="headerContainer">
				{/*<marquee height="50" direction="up" >Food Mood</marquee>*/}
				<h1>Food Mood</h1>
				<NavBar />
			</div>
			)
	}
})

const NavBar = React.createClass({
	render: function() {
		return (
			<div id="navBar">
				<a className= "button button-primary" href="#login">Login</a>
				<a className= "button button-primary" href="#home">Home</a>
				<a className= "button button-primary" href="#dish/myDishes">My Dishes</a>
				<a className= "button button-primary" href="#dish/postDishes">Post Dish</a>
				<a className= "button button-primary" href="#" onClick={ACTIONS.logUserOut} >log out</a>
			</div>
			)
	}
    
})



export default Header