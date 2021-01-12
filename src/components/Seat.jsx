import React from "react";

const Seat = props => {
  let seatBookedClass = "m-2 btn ";
  if(props.booked && props.mySession)
      seatBookedClass+=" btn-primary";
  else if(props.booked && !props.mySession)
      seatBookedClass+=" btn-secondary ";
  else
      seatBookedClass+=" btn-outline-secondary";
      
  return (
    <button
      onClick={()=>props.onBook(props.seatId,props.row.rowName)}
      style={{ width: 50 }}
      className={seatBookedClass}
    >
      {props.seatId}
    </button>
  );
};

export default Seat;
