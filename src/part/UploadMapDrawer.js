import React,{Component} from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import FaClock0 from 'react-icons/lib/fa/clock-o'
import Rating from 'react-rating'
import Display from './Display'

class UploadMapDrawer extends Component{
  constructor(props){
      super(props)
      this.state = {
        dataIndex: [],
        dataReview:[],
        showReview: false,
        isOpen: false
      }
    }

  componentWillMount(){
      var newdataIndex = this.state.dataIndex
      //console.log(this.props.data)
        Object.keys(this.props.data[0]).map((index,i)=>{
        return newdataIndex.push(index)
       })
        this.setState({
          dataIndex: newdataIndex
        })
      //console.log(this.state.dataIndex)
    }     
    
    drawInfo(locationName){
      fetch("http://maps.googleapis.com/maps/api/geocode/json?address={"+locationName+"}&sensor=false")
      .then(response => response.json())
      .then((data)=>{ return data.results["0"]["place_id"] })
      .then((data) => fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid="+data+"&key=AIzaSyD6oT68MuEUOph6Ea1cp3vwyiGxrFYM9SI"))
      .then(response => response.json())
      .then((data)=> { 
      this.setState({
        dataReview: data["result"],
        showReview: true
        }) 
      console.log(Object.keys(this.state.dataReview))
          })
    }
    
  render(){
    var fallData = this.state.dataReview
    return(
        <div>
            <GoogleMap
              defaultZoom={8}
              defaultCenter={{ lat: 43.2094725487, lng: -79.8171255622 }}
              >
              
               {console.log(this.props.data[0][this.state.dataIndex[0]])}
                {Object.keys(this.props.data).map((index,i)=>{
                  if(this.props.data[index][this.state.dataIndex[1]] !== undefined && this.props.data[index][this.state.dataIndex[2]])
                  {
                    let long = parseFloat(this.props.data[index][this.state.dataIndex[1]])
                    let lat = parseFloat(this.props.data[index][this.state.dataIndex[2]])
                    
                return  (<Marker key={i} position={{ lat: lat,lng: long }} defaultAnimation={2} onClick={()=>{this.drawInfo(this.props.data[index][this.state.dataIndex[0]])}}> 
                      {this.state.isOpen && <InfoWindow key={i}>
                        <div>
                        <p>{index}. {this.props.data[index][this.state.dataIndex[0]]}</p>
                        </div>
                      </InfoWindow>}
                </Marker>)    
                }            
                return null
             })}
            </GoogleMap>
            <Display if={this.state.showReview}>
            <div className="review">
            {Object.keys(fallData).map((item)=>{
                console.log(fallData[item])
                if(item === "name"){
                   return( <h3>{fallData["name"]}</h3>)
                }

                if(item === "formatted_address"){
                    return(<p>{fallData["formatted_address"]}</p>)
                }

                if(item === "opening_hours"){
                    console.log(fallData["opening_hours"])
                    return(<div className="col-md-4">
                        <table className="table-condensed timetable">
                        <tbody>
                            <tr>
                                <td><FaClock0/></td>
                                <td><Display if={fallData["opening_hours"]["open_now"] === false}>
                                    <h4>Closed</h4>
                                    </Display>
                                    <Display if={fallData["opening_hours"]["open_now"] === true}>
                                    <h4>Open</h4></Display>
                                </td>
                            </tr>
                         
                            <tr>
                                
                                <td colSpan="2">{Object.keys(fallData["opening_hours"]["weekday_text"]).map((item)=>{
                                return(<li style={{ listStyleType: "none"}}>{fallData["opening_hours"]["weekday_text"][item]}</li>)
                            })}</td>
                            </tr>
                            
                        </tbody>
                        </table>
                         </div>
                    )
                }


                if(item === "reviews")
                {
                 return(<div className="col-md-6 col-md-offset-right-1 detailbox">
                     <h4>Reviews</h4>
                     {fallData["reviews"].map((rev,i)=>{
                         //console.log(fallData[rev]);
                         return(<table className="table-condensed" key={i}>
                            <tbody>
                                <tr>
                                    <td><img src={rev["profile_photo_url"]} alt="profile picture" width="70px"/></td>
                                    <td><h4>{rev["author_name"]}</h4><Rating initialRate={rev["rating"]} readonly/><br/>{rev["relative_time_description"]}</td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td><span>{rev["text"]}</span></td>
                                </tr>
                          </tbody>
                        </table>)
                     })}
                 </div>)   
                }
                
            })}
            </div>
            </Display>
        </div>
      )
  }
}

export default withGoogleMap(UploadMapDrawer)