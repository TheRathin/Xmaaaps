import React,{Component} from 'react'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
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
       var data = this.props.drawFallData[0];
        Object.keys(data).map(index => {
        return newdataIndex.push(index)
       })
        this.setState({
          dataIndex: newdataIndex
        })
    }     
    
    
  render(){
      var falldata = this.props.drawFallData
      var dataindex = this.state.dataIndex
      var namepos = dataindex[2]
      var longpos = dataindex[12]
      var latpos = dataindex[13]

    return(
        
            <GoogleMap
              defaultZoom={10}
              defaultCenter={{ lat: 43.3094725487, lng: -79.85 }}
              >
              
               
                {Object.keys(falldata).map((index,i)=>{
                  //console.log(this.state.dataIndex[1])
                  var itemrow = falldata[index]
                  let name = itemrow[namepos]
                  let long = parseFloat(itemrow[longpos])
                  let lat = parseFloat(itemrow[latpos])
                    
                return (
                      <Marker 
                        key={i} 
                        position={{ lat: lat,lng: long }}
                        defaultAnimation={2} 
                        onClick={ ()=>{this.props.drawInfo(name)} }//I am setting a timout because the googlemaps does not like rapid request
                        /> 
                      )    
                  })}
            </GoogleMap>
      )
  }
}

export default (withGoogleMap(WaterfallDrawer))