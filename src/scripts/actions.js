import {User} from './models/models'

const ACTIONS = {
	registerUser: function(userObj){
		User.register(userObj).then(() => this.logUserIn(userObj.email, 
			userObj.password),
		(err) => {
			alert('FAILURE Registering')
				console.log(err)
		})
	},

	logUserIn: function(email, password){
		User.login(email,password).then(
			(resp) =>{
				alert(`user ${email} logged in!`)
				console.log(resp)
				location.hash = "home"
			},

			(err) => {
				alert('FAILURE Logging In')
				console.log(err)
			})
	},

	logUserOut: function(){
		User.logout().then(
			() => location.hash = "login"
		)
	}
}

export default ACTIONS