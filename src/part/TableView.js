import React ,{ Component} from 'react'
import Display from './Display'
import DrawMap from './DrawMap'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table'
import {Card} from 'material-ui/Card';

  


const TableViewHeader = ({tableData, columnSelector}) => {
	var tableHeader = tableData[0]
	return(
		<Table className="table-condensed timetable" selectable={false} height="250px">
			<TableHeader 
				displaySelectAll={false}
				adjustForCheckbox ={false}
			>
				<TableRow selectable={true}>
				{Object.keys(tableHeader).map((columnName,i) =>{
					return (
						<TableHeaderRow 
							key={i}
							index={i}
							columnName={columnName} 
							columnSelector={columnSelector}
						/>
					)
				})}
				</TableRow>
			</TableHeader>
			<TableBody>
				{Object.keys(tableData).map((index, i)=>{
					return(<TableViewRow key={i} tableData={tableData} itemPosition={index}/>
					)
				})}
				
			</TableBody>
		</Table>
	)
}

const TableHeaderRow = ({columnName, columnSelector, index}) =>{ 
	return(
		<TableHeaderColumn onClick={() => columnSelector(columnName, index)}>
			{columnName}
		</TableHeaderColumn>
	)
}

const TableViewRow = ({itemPosition, tableData}) => {
	var itemRow = tableData[itemPosition]
	return(
	<TableRow>
	{Object.keys(itemRow).map((itemDetail, i)=>{
		return(
			<TableRowColumn key={i}>{itemRow[itemDetail]}</TableRowColumn>	
		)
		})}
   </TableRow>
	)
}

export default class TableView extends Component{
	constructor(props){
		super(props)
		this.state= {
			tblviData: [],
			colData: [],
			showmap: false
		}
	}
	componentWillMount = () => {
		this.setState({
			tblviData: this.props.tblData
		})
	}
	componentWillReceiveProps = (nextProps) => {
		if(nextProps.tblData !== this.state.tblviData)
		{
			this.setState({
				tblviData: nextProps.tblData,
				colData:[],
				showmap: false
			})
		}
	}
	colSelect = (colName, position) => {
		var newColData = this.state.colData
		if(newColData.length >= 0 && newColData.length <= 2){
			if(newColData.includes(colName) === false)
			{
				newColData.push(colName)
				this.setState({
				colData: newColData
				})
			}//checking whether user has already selected a column name		
		}
	}
	sendColData = () => {
		
		//console.log(this.state.colData)	

		this.setState({
			showmap: true
		})
	}
	
render(){
	 var tblvidata = this.state.tblviData
	 var collength = this.state.colData.length
	 var coldata = this.state.colData
    return(
		<div>
        <h3>Table</h3>
		<Display if={collength === 0}>
					<p>Select Name, Longitude and Latitude column header in order</p>
		</Display>

		<Card>
		    <div>
				
				<Display if={collength >= 0 && collength <= 3}>
					{Object.keys(coldata).map( (index,i) => {
							var position = coldata[index]
							
						 return(<p key={i}>{position}</p>)
						})//not showing elements or data but in console.log
					 } 
				</Display>

				<Display if={collength === 3}>
					<button className="btn btn-success pimpButton" onClick={this.sendColData}>
					 	Submit
					</button>
					      &nbsp;
					<button className="btn btn-danger pimpButton" onClick={() => this.setState({colData : [], showmap: false})}>
					 	Clear
					</button>
				</Display>
			</div>
			<div>
				<TableViewHeader 
					tableData={tblvidata} 
					columnSelector={this.colSelect}
				/>
			</div>
			<div>
					<Display if={this.state.showmap}>
						 <DrawMap
						   loadingElement={<div style={{ height: `100%` }} />}
						   containerElement={<div style={{ height: `400px` }} />}
						   mapElement={<div style={{ height: `100%` }} />}
						   tableData = {this.state.tblviData}
						   colData = {this.state.colData}
						 />
					</Display>
			</div>
		</Card>
		</div>
    )
}
}