import React, { Component } from 'react'
import Rating from 'react-rating'
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import {Card, CardHeader} from 'material-ui/Card';
//import Chip from 'material-ui/Chip';


const TimeTable = ({ openBoolean, openTime }) => {
    var openOrnot;
    if(openBoolean === false)
    {
        openOrnot = "Close"
    }else if(openBoolean === true)
    {
        openOrnot = "Open"
    }
    return(
        <Card>
         <CardHeader
            title={openOrnot}
            titleStyle={{fontSize:"18px", fontWeight:"normal"}}
            style={{backgroundColor:"#FFC107"}}
            />
            <Table className="table-condensed timetable" height="350px">
                <TableBody 
                    displayRowCheckbox={false} 
                    showRowHover={true} 
                >
                
                {Object.keys(openTime).map( day => {
                    return(
                            <TableRow >
                                <TableRowColumn>
                                  {openTime[day]}
                                </TableRowColumn>
                             </TableRow>
                        )
                })}
                    
                </TableBody>
            </Table>
        </Card>
    )
}

const FallReviews = ({ fallReview }) => {
    return(
        <Card>
          <CardHeader
            title="Reviews"
            titleStyle={{fontSize:"18px", fontWeight:"normal"}}
            style={{backgroundColor:"#FFEB3B"}}
            />
            <Table height="350px">
                
                <TableBody 
                    displayRowCheckbox={false} 
                    showRowHover={true}                
                    >
                    {fallReview.map(rev =>{ 
                        return(
                        <TableRow>
                            <TableRowColumn style={{width:'10px'}}>
                                <img src={rev["profile_photo_url"]} alt="user profile" width="90px" style={{float:'left', margin:'15px 15px 15px 0px'}}/>
                                <h4>{rev["author_name"]}</h4><Rating initialRate={rev["rating"]} readonly/><br/>{rev["relative_time_description"]}<br/>
                                <p>{rev["text"]}</p>
                            </TableRowColumn>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Card>
    )
}

export default class WaterfallBox extends Component{
    render(){
         
        let fallreview = this.props.reviewData
         
        return(
            <div className="reviewBox">
            {Object.keys(fallreview).map((item)=>{
                //console.log(fallreview)
                switch(item) {
                    case "name":
                        return ( <h3>{fallreview["name"]}</h3> )
                    case "formatted_address":
                        return ( <p>{fallreview["formatted_address"]}</p> )
                    case "opening_hours":
                        return (
                          <div className="col-md-4">
                            <TimeTable 
                                openBoolean={fallreview["opening_hours"]["open_now"]} 
                                openTime={fallreview["opening_hours"]["weekday_text"]}
                             />
                          </div>
                        )
                    case "reviews":
                        return (
                            <div className="col-md-7">
                                 <FallReviews fallReview={fallreview["reviews"]} />
                            </div>
                        )
                    default:
                        return(
                            null
                        )
                }
            })}
            </div>
        )
    }
}
