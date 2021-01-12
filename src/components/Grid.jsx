import React, { Component } from 'react';
import Seat from './Seat'
import axios from 'axios';
import uuid from "uuid";

import ErrorView from './ErrorView'

class Grid extends Component {
  constructor(){
    super();
    this.sessionId = uuid.v4();
  }

  state = {
      rows : [],
      showError : ``
  }

  //API calls

 //async call to get data from the server
  loadAvailableSeatsFromServer = ()=>{
    return new Promise(resolve=>{
        axios.get('http://localhost:3000/api/currentSeats')
        .then(function (response) {
          resolve(response.data.rowsArray);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  //async call to book the desired Seat
  requestSeatBooking=(seatId,rowName)=>{
      return new Promise(resolve=>{
        axios.post('http://localhost:3000/api/bookSeat', {
          rowName,
          seatId,
          sessionId:this.sessionId
        })
        .then(function (response) {
          
          let data = response.data.rowsArray

         // let booked=response.data.bookedseats

          if(response.errorMessage !== undefined)
            resolve({data});
          else
            resolve({data,errorMessage:response.data.errorMessage})
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  //initialize the state of the componenent after getting data from server
  async componentDidMount(){
    const data = await this.loadAvailableSeatsFromServer();
    this.setState({rows:data}) 
   
  }

   //set state after booking th seat
   handleBooking = async (seatId,rowName)=>{
    const {data,errorMessage} = await this.requestSeatBooking(seatId,rowName);
    if(errorMessage !== undefined)
      this.setState({rows:data,showError:errorMessage}) 
    else
      this.setState({rows:data}) 

  }
  handleE


  render() {
    return (
      <div className="container">
      {this.state.error}
        <ErrorView showError={this.state.showError}/>
        <div className="mt-5 w-50 mx-auto">
            {this.state.rows.map((row,i)=>{
              const rowSeats = Object.keys(row.seats).map(seatId=>{
                    return <Seat key={seatId} row={row} seatId={seatId} mySession={this.sessionId === row.seats[seatId].sessionId} booked={row.seats[seatId].booked} onBook={this.handleBooking}/>
                })
                rowSeats.push(<br key={i}/>) 
                return rowSeats;
            })}
        </div>
              <hr></hr>
							
              <div>
              <div className="row">
    <div className="col-sm-4" />
    <div className="col-sm-8">
     
      <div className="card p-5 shadow">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Enter you name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Enter your email address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Contactno</label>
            <input
              className="form-control"
              type="number"
              name="contactnumber"
              placeholder="Enter your contact number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Moviename</label>
            <input
              className="form-control"
              type="text"
              name="moviename"
              placeholder="Enter the movie name"
            />
          </div>
          <div>
          <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Booknow</button>
          <div class="modal fade" id="myModal" role="dialog">
         <div class="modal-dialog">
  
         <div class="modal-content">
             <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Ticket Details</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
  </div>
          </div>
          <hr></hr>
        </form>
      </div>
    </div>
    <div className="col-sm-2" />
  </div>
              </div>
        </div>
        
    );
  }
}

export default Grid;
