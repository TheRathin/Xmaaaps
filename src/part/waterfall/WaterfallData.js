import React, { Component } from 'react'
import WaterfallDrawer from './WaterfallDrawer'
import Display from "../Display"
import WaterfallBox from "./WaterfallBox"


const Papa = require('papaparse')

const WaterfallMap = ({fallData, drawInfo}) =>{
	return(
		<WaterfallDrawer 
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `400px` }} />}
			mapElement={<div style={{ height: `100%` }} />} 
			drawFallData={fallData}
			drawInfo={drawInfo}
			/>
	)
}

export default class WaterfallData extends Component {
	constructor(props){
		super(props)
		this.state = {
			fallData: [],
			fallReview: [],
			openData: false
			}
	}

	componentWillMount = () => {
		var self = this
		Papa.parse("https://cors-anywhere.herokuapp.com/opendata.hamilton.ca/CSV/CITY_WATERFALLS.csv", {
			download: true,
			header:true,
			dynamicTyping: true,
			complete: function(results) {
				self.setState({
					fallData: results["data"],
					openData: true
				})
			}
		})
	}//https://cors-anywhere.herokuapp.com/ allows to solve CORS problem

	drawInfo = (locName) => {
		setTimeout(
			() => {
			fetch("http://maps.googleapis.com/maps/api/geocode/json?address={"+locName+"}&sensor=false")
			.then(response => response.json())
			.then((data)=>{if(data.status === "OK") {let placeid = data.results["0"]["place_id"]; return placeid }} )
			.then((data) => fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid="+data+"&key=AIzaSyD6oT68MuEUOph6Ea1cp3vwyiGxrFYM9SI"))
			.then(response => response.json())
			.then((data)=> { 
			this.setState({fallReview: data["result"]}) 
			//console.log(Object.keys(this.state.fallReview).length)
					})
				}, 1000)
			}

	render(){
			let falldata = this.state.fallData
			let opendata = this.state.openData
			let fallreview = this.state.fallReview
		return(
				<div className="col-md-12">
					<h2>Hamilton Waterfalls</h2>

						<Display if={opendata}>
							<WaterfallMap 
								fallData={falldata} 
								drawInfo={this.drawInfo} 
								/>
						</Display>
						
							<Display if={Object.keys(fallreview).length === 0}>
								<h5>Click on any marker to see the details of the location</h5>
							</Display>

							<Display if={Object.keys(fallreview).length > 0}>
								<WaterfallBox 
									reviewData={fallreview} 
									/>
							</Display>

				</div>	
			)
	}
}