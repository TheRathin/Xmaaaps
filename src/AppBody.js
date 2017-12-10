import React, { Component } from 'react'
import WaterfallData from './part/WaterfallData'
import UploadLocation from './part/UploadLocation'

class AppBody extends Component {
	render() {
		return(
				<div>
					<WaterfallData/>
					<div className="container-fluid">
					<h2>Upload your data</h2>
					<UploadLocation/>
					</div>
				</div>
			)
	}
}

export default AppBody