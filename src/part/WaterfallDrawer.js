import React,{Component} from 'react'
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
//import SearchBox from "react-google-maps/lib/components/places/SearchBox"


class WaterfallDrawer extends Component{
  constructor(props){
      super(props)
      this.state = {
        dataIndex: [],
        isOpen: false
      }
    }

  componentWillMount(){
      var newdataIndex = this.state.dataIndex
        Object.keys(this.props.data[0]).map((index,i)=>{
        return newdataIndex.push(index)
       })
        this.setState({
          dataIndex: newdataIndex
        })
    }     
    
    
  render(){
    return(
        
            <GoogleMap
              defaultZoom={8}
              defaultCenter={{ lat: 43.2094725487, lng: -79.8171255622 }}
              >
              
               
                {Object.keys(this.props.data).map((index,i)=>{
                  if(this.props.data[index][this.state.dataIndex[1]] !== undefined && this.props.data[index][this.state.dataIndex[2]])
                  {
                    let long = parseFloat(this.props.data[index][this.state.dataIndex[12]])
                    let lat = parseFloat(this.props.data[index][this.state.dataIndex[13]])
                    
                return  (<Marker key={i} position={{ lat: lat,lng: long }} defaultAnimation={2} onClick={()=>{this.props.drawInfo(this.props.data[index][this.state.dataIndex[2]])}}> 
                      {this.state.isOpen && <InfoWindow key={i}>
                        <div>
                        <p>{index}. {this.props.data[index][this.state.dataIndex[2]]}</p>
                        <p>Ranking: {this.props.data[index][this.state.dataIndex[6]]}</p>
                        </div>
                      </InfoWindow>}
                </Marker>)    
                }            
                return null
             })}
            </GoogleMap>
      )
  }
}

export default (withGoogleMap(WaterfallDrawer))