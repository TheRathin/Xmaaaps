import React, {Component} from 'react'

class TableRow extends Component {
	render(){
		return(
			<tr>
                    {Object.keys(this.props.data[this.props.row]).map((tableItem, i) =>{
                    	//if(tableItem === 'NAME'){console.log(this.props.data[this.props.row][tableItem])}
                        return <td key={i}>{this.props.data[this.props.row][tableItem]}</td>
                    })}
             </tr>
			)
	}

}

export default TableRow