import React, { Component } from 'react'
import ReactFileReader from 'react-file-reader'
import Display from './Display'
import TableView from './TableView'
import RaisedButton from 'material-ui/RaisedButton'

//import FontIcon from 'material-ui/FontIcon'

var Papa = require('papaparse')
var data

export default class UploadLocation extends Component{
	constructor(props){
		super(props)
		this.state = {
			tblData: '',
			tblEnb: false,
			refresh: false
		}
	}
	handleFiles = (files) => {
		var self = this
		if(files !== undefined) //if user does not upload 
		{
		Papa.parse(files[0],{
			 header: true,
      dynamicTyping: true,
			complete: function(results){
				data = results.data
				self.setState({
					tblData: data,
					tblEnb: true,
					refresh: true
				})
			}
		})
		
	}

	}
	render(){
			var tblenb = this.state.tblEnb
			var tbldata = this.state.tblData
			
		return(
				<div className="col-md-12">
				   <h2>Upload your location</h2>
					<ReactFileReader fileTypes={[".csv"]} handleFiles={this.handleFiles}>
						<RaisedButton 
							label="Upload" 
							backgroundColor="#E91E63" 
							labelColor="#ffffff"
						/>
					</ReactFileReader>
					<Display if={tblenb && tbldata !== undefined}>
						<TableView tblData={tbldata}/>
					</Display>
				</div>
			)
	}
}

