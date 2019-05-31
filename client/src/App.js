import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';

import './App.css';

// Check for Token
if (localStorage.jwtToken) {
	// Set Auth Token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode Token (Get user info and expiration)
	const decoded = jwt_decode(localStorage.jwtToken); 
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expiry
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout
		store.dispatch(logoutUser());
		// TODO: Clear profile

		// Redirect to login
		window.location.href = '/login'
	}
}

function App() {
	return (
		<Provider store={ store }>
			<Router>
				<div className="App">
					<Navbar/>
					<Route exact path="/" component={Landing}/>
					<div className="container">
						<Route exact path="/register" component={Register}/>
						<Route exact path="/login" component={Login}/>
					</div>
					<Footer/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
