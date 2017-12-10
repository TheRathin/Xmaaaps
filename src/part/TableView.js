import React ,{ Component} from 'react'
import TableRow from './TableRow'
import Display from './Display'
import UploadMapDrawer from './UploadMapDrawer'

class TableView extends Component{
	constructor(props){
		super(props)
		this.state= {
			tblvidata: [],
			coldata: [],
			fnldata:[],
			showmap: false
		}
	}
	componentWillMount(){
		this.setState({
			tblvidata: this.props.tbldata
		})
	}
	columnSelector(colname){
		var newcoldata = this.state.coldata
		
		if(newcoldata.length<3)
		{
			newcoldata.push(colname)
			this.setState({
				coldata: newcoldata
			})
		}
	}
	eraseSelection(){
		var newcoldata =[]
		this.setState({
			coldata: newcoldata,
			fnldata: [],
			showmap: false
		})
	}
	filter(){
		var tbldata = this.state.tblvidata
		var fltcoldata = this.state.coldata
		var newfnldata = this.state.fnldata
		var name,long,lat

			{Object.keys(tbldata).map(function(itemNum,i){
					{Object.keys(tbldata[itemNum]).map((tableItem, i) =>{
                    	if(tableItem === fltcoldata[0]){name = tbldata[itemNum][tableItem]}
                    	else if(tableItem === fltcoldata[1]){long = tbldata[itemNum][tableItem]}
                    	else if(tableItem === fltcoldata[2]){lat = tbldata[itemNum][tableItem]}
                        if(name !== undefined && long !== undefined && lat !== undefined){
                        	
	                        	newfnldata.push({"name":name, "lng":long, "lat":lat})
                        	name = undefined
                        	long = undefined
                        	lat = undefined
                        }
                  })}
			})}
			this.setState({
				fnldata: newfnldata			
			})
			//console.log(this.state.fnldata)
		}
	render(){
		var self = this
		
		return(
			
			<div className="table-responsive">
				<h1>Table Data</h1>
				<div>
					<Display if={this.state.coldata.length === 0}>
						<p>Select Name, Longitude, Latitude in order</p>
					</Display>

					<Display if={this.state.coldata.length > 0}>
						{this.state.coldata.map((colname,i)=>{
							return <p key={i}>{colname}</p>
						})}
						<Display if={this.state.coldata.length ===3}>
							<button className="btn btn-success" onClick={()=>this.filter()}>Submit</button>&nbsp;
							<button className="btn btn-danger" onClick={()=>this.eraseSelection()}>Erase Selection</button>
						</Display>
					</Display>
				</div>
				<table className="table table-condensed">

					<thead>
						<tr>
					{Object.keys(this.props.tbldata[0]).map(function(itemNum,i){
						return <th key={i} onClick={()=>self.columnSelector(itemNum)}>{itemNum}</th>
					})}
						</tr>
					</thead>

					<tbody>
					 {Object.keys(this.props.tbldata).map(function(itemNum,i){
						return <TableRow key={i} row={itemNum} data={self.state.tblvidata}></TableRow>
					})}
					</tbody>
				
				</table>
			<Display if={this.state.fnldata.length > 0} >
			<UploadMapDrawer
  				loadingElement={<div style={{ height: `100%` }} />}
  				containerElement={<div style={{ height: `400px` }} />}
				  mapElement={<div style={{ height: `100%` }} />} 
  											data={this.state.fnldata}
  										/>
  				
				</Display>
			</div>
			)
	}
} 

export default TableView