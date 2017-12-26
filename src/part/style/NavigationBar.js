import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

export default class NavigationBar extends Component {
	constructor(props){
		super(props)
		this.state={ open: false }
	}
	toggleDrawer = () =>{
		this.setState({
			open: !this.state.open
		})
	}
	closeDrawer = () =>{
		this.setState({
			open: false
		})
	}
	render(){
		return(
			 <div>
				<AppBar
					title="Xmaaaps"
					onLeftIconButtonClick={this.toggleDrawer} 
				/>
				<Drawer 
					 open={this.state.open}
					 docked={false}
					 onRequestChange={(open)=> this.setState({open})}
				 >
				 	<Link to="/"><MenuItem onClick={this.closeDrawer}>Home</MenuItem></Link>
					<Link to="/upload"><MenuItem onClick={this.closeDrawer}>Upload</MenuItem></Link>
					<Link to="/about"><MenuItem onClick={this.closeDrawer}>About</MenuItem></Link>
					<Link to="/feedback"><MenuItem onClick={this.closeDrawer}>Feedback</MenuItem></Link>
				</Drawer>
			 </div>
			)
	}
}
