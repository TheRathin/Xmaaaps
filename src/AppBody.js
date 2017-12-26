import React, { Component } from 'react'
import WaterfallData from './part/waterfall/WaterfallData'

class AppBody extends Component {
	render() {
		return(
				<div className="container-fluid">
				  <div className="row">
						<WaterfallData/>
				   </div>
				</div>
			)
	}
}

export default AppBody