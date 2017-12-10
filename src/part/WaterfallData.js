import React, { Component } from 'react'
import WaterfallDrawer from './WaterfallDrawer'
import Display from "./Display"
import WaterfallBox from "./WaterfallBox"


var Papa = require('papaparse')


export default class WaterfallData extends Component {
	constructor(props){
		super(props)
		this.state = {
			fallData: [],
			fallReview: [],
			openData: false
			
}
	}
	drawInfo = (locationName)=>{
		
		fetch("http://maps.googleapis.com/maps/api/geocode/json?address={"+locationName+"}&sensor=false")
		.then(response => response.json())
		.then((data)=>{ return data.results["0"]["place_id"] })
		.then((data) => fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid="+data+"&key=AIzaSyD6oT68MuEUOph6Ea1cp3vwyiGxrFYM9SI"))
		.then(response => response.json())
		.then((data)=> { 
		this.setState({fallReview: data["result"]}) 
		//console.log(Object.keys(this.state.fallReview).length)
				})	
			}

	componentWillMount = () => {
		var self = this
		Papa.parse("http://opendata.hamilton.ca/CSV/CITY_WATERFALLS.csv", {
			download: true,
			header:true,
			dynamicTyping: true,
			complete: function(results) {
				self.setState({
					fallData: results["data"],
					openData: true
				})
			}
		});
	}
	render(){
		return(
				<div className="container-fluid">
					<div className="row">

						<div className="col-md-12">
								<h2>Hamilton Waterfalls</h2>
									<div className="row">
										<div className="col-md-5">
										<Display if={this.state.openData}>
											<WaterfallDrawer 
  				loadingElement={<div style={{ height: `100%` }} />}
  				containerElement={<div style={{ height: `400px` }} />}
				  mapElement={<div style={{ height: `100%` }} />} 
  											data={this.state.fallData}
  										    drawInfo={this.drawInfo}
  										/></Display>
										</div>

										<div className="col-md-7">
										   <p>Click on any marker to see the data, of the location</p>
										   <Display if={Object.keys(this.state.fallReview).length > 0}>
														<WaterfallBox data={this.state.fallReview}/>
										   </Display>
										</div>
									</div>

							
						</div>
					</div>

					
						
							
								
						

					
				</div>

			)
	}
}