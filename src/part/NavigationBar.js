import React, { Component } from 'react';

class NavigationBar extends Component {
	render(){
		return(
			<nav className="navbar navbar-default">
				<div className="container-fluid">

					<div className="navbar-header">
					  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					  </button>
					  <a className="navbar-brand" href="">Xmaaaps</a>
					</div>

					<div className="collapse navbar-collapse">        
					  <ul className="nav navbar-nav navbar-right">
						<li><a href="">Home</a></li>
						<li><a href="">About</a></li>
						<li><a href="">Feedback</a></li>
					  </ul>
					</div>

		  		</div>
			</nav>
			)
	}
}

export default NavigationBar