import React, { Component } from 'react';


export default class About extends Component{
    render(){
        return(
            <div className="container-fluid">
               <div className="row">
                 <div className="col-md-7 col-md-right-offset-5">
                <h2>About</h2>
                <p>Xmaaaps is a solution to the problem where you have to mark all the data on the google map.</p>
                <p>Why name it Xmaaaps? <br/> X signfies mutation, Xmaaaps implies mutation of the google maps. Like a mutant has more power than a normal human, same is with Xmaaaps it has more power than a normal google map.</p>
                <p>The story behind its origin? <br/> So prof. told my class that we have to use Hamilton open data and show it on google map using gmaps library. I though damm! every student is going to follow the same step i.e have a open data and mark it on google map. This is a good problem! What about they go to an app, upload their open data and app would mark it on google map. Here Xmaaaps was originated.</p>
                  </div>
                </div>
            </div>
        )
    }
}