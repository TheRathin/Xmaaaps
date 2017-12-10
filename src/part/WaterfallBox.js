import React, { Component } from 'react'
import FaClock0 from 'react-icons/lib/fa/clock-o'
import Rating from 'react-rating'
import Display from './Display'

export default class WaterfallBox extends Component{
    constructor(props){
        super(props)
        this.state={
            day: ["Moday","Tuesday","Wednesday","Friday","Saturday","Sunday"]
        }
    }
    render(){
         var fallData = this.props.data
         
        return(
            <div className="row">
            <h3>Data related to Location</h3>
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
        )
    }
}
