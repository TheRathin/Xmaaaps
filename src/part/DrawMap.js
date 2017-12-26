import React ,{ Component} from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import Display from './Display'
import Rating from 'react-rating'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import {Card, CardHeader} from 'material-ui/Card';

  const UserReviews = ({ userReview }) => {
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
            {userReview.map( (rev,i) =>{ 
                return(
                   <TableRow key={i}>
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

const LocationReviews = ({ReviewData}) => {
    return(
        Object.keys(ReviewData).map((item)=>{
            //console.log(ReviewData[item])

            switch(item) {
                case "name":
                    return ( <h3>{ReviewData["name"]}</h3> )
                case "formatted_address":
                    return ( <p>{ReviewData["formatted_address"]}</p> )
                case "opening_hours":
                    return (
                      <div className="col-md-4">
                        <TimeTable 
                            openBoolean={ReviewData["opening_hours"]["open_now"]} 
                            openTime={ReviewData["opening_hours"]["weekday_text"]}
                         />
                      </div>
                    )
                case "reviews":
                    return (
                        <div className="col-md-7">
                             <UserReviews userReview={ReviewData["reviews"]} />
                        </div>
                    )
                default:
                    return(
                        null
                    )
            }
        })
    )
}



class DrawMap extends Component {
    constructor(props){
        super(props)
        this.state={
            dataReview: [],
            showReview: false
        }
    }

    drawInfo = (locname) => {
        setTimeout(
			() => {
      fetch("http://maps.googleapis.com/maps/api/geocode/json?address={"+locname+"}&sensor=false")
      .then(response => response.json())
      .then((data)=>{if(data.status === "OK") {let placeid = data.results["0"]["place_id"]; return placeid }} )
      .then((data) => fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid="+data+"&key=AIzaSyD6oT68MuEUOph6Ea1cp3vwyiGxrFYM9SI"))
      .then(response => response.json())
      .then((data)=> { 
            this.setState({
                dataReview: data["result"],
                showReview: true
                }) 
          })
        },1000)
    }
    
    render(){
        var tabledata = this.props.tableData
        var coldata = this.props.colData
        var namepos = coldata[0]
        var longpos = coldata[1]
        var latpos = coldata[2]
        return(
            <div>
                <div>
                <GoogleMap
                    defaultZoom={9}
                    defaultCenter={{ lat: 43.3094725487, lng: -79.8171255622 }}
                >
                    {Object.keys(tabledata).map( (index, i) =>{
                        var itemrow = tabledata[index]
                        let name = itemrow[namepos]
                        let long = parseFloat(itemrow[longpos])
                        let lat = parseFloat(itemrow[latpos])
                        return  (
                        <Marker key={i} position={{ lat: lat,lng: long }} defaultAnimation={2} onClick={() => this.drawInfo(name)}/> 
                            ) 
                    })}
                </GoogleMap>
                </div>
                <Display if={this.state.showReview}>
                    <div className="reviewBox">
                        <LocationReviews ReviewData={this.state.dataReview}/>
                    </div>
                </Display>            
            </div>
        )
    }
}

export default  withGoogleMap(DrawMap)