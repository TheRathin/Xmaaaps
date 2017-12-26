import React, { Component } from 'react';



const FeedbackForm = () => {
    
    return(
        <form className="form-horizontal"  action="https://formspree.io/rathinsharmas@gmail.com"
        method="POST">
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                <div className="col-sm-10">
                   <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="message">Message:</label>
                <div className="col-sm-10">
                    <textarea name="message" className="form-control" rows="5" id="message" placeholder="Enter message"></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className=" col-xs-12 col-sm-offset-2 col-sm-offset-10">
                <button type="submit" className="btn btn-success">Send</button>
                </div>
            </div>
        </form>
    )
}

export default class Feedback extends Component{
    
    render(){
        return(
            <div className="container-fluid">
              <h2>Feedback</h2>
                <div className="row">            
                        <div className="col-sm-6 col-sm-offset-right-6">
                            <FeedbackForm />
                        </div>
                </div>
            </div>
        )
    }
}