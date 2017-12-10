import React, { Component } from 'react'
import ReactFileReader from 'react-file-reader'
import Display from './Display'
import TableView from './TableView'
var Papa = require('papaparse')
var data

export default class UploadLocation extends Component{
	constructor(props){
		super(props)
		this.state = {
			tbldata: '',
			tblenb: false
		}
	}
	handleFiles = (files) => {
		var self = this
		Papa.parse(files[0],{
			 header: true,
      dynamicTyping: true,
			complete: function(results){
				data = results.data
				self.setState({
					tbldata: data,
					tblenb: true
					
				})
			}
		})
		
		

	}
	render(){
		return(
				<div>
					<ReactFileReader fileTypes={[".csv"]} handleFiles={this.handleFiles}>
						<button className="btn btn-success">Upload</button>
					</ReactFileReader>
					<Display if={this.state.tblenb}>
						<TableView tbldata={this.state.tbldata} />
					</Display>
				</div>
			)
	}
}

