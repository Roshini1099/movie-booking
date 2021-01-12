  
import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
 
 function Booking(props) {
    const [open,getOpen]=useState([]);
    const [seatnumber,setSeat]=useState("")
    const [email,setEmail]=useState("")
    useEffect(()=>{
        getAllopentickets();

    },[]);

const getAllopentickets=async()=>{
    console.log("openticket");
    const response=await axios.get("https://ticket-nest.herokuapp.com/ticket/status/open");
    console.log(response);
    getOpen(response.data);
    console.log(open);
};
const { register, errors, handleSubmit,reset,getValues,onChange,onClick} = useForm();
const onChangeSeat=(e)=>{
    setSeat(e.target.value);
}
const onChangeEmail=(e)=>{
    setEmail(e.target.value);
}

function findByKey(key,value) {
    return(item,i)=> item[key]===value
}
const handleDelete=(seatnumber)=>{
        let index=open.findIndex(i=>i.seatnumber==seatnumber)
        console.log(index);
        const array=[...open]
        delete array[index];
         console.log(array);
         getOpen(array);
 }
        
const onSubmit=async(e)=> {
        const bookingdata={
            seatnumber,
            email
        };
        console.log(bookingdata);
        await axios.post("https://ticket-nest.herokuapp.com/ticket/addTicket",bookingdata,
         {
          headers: {
            "Content-Type": "application/json",
          },
        })
            .then((res)=>{
                console.log(seatnumber);
                setSeat(seatnumber);
                setEmail(email);
                handleDelete(seatnumber)
                //props.history.push("/");
             })
            .catch((error)=>{
                 console.log(error);
            });

        alert('SUCCESS!! :-) Ticket Successfully Booked!!!\n\n' + JSON.stringify(e, null, 4));
    }
const home=async(e)=>{
    props.history.push("/");
}

return(
    <div className="row">
    <div className="col-sm-2" />
    <div className="col-sm-8">
      <h4 className="text-muted text-center mb-5">Book a seat to watch a Show!!!!!!!!</h4>
      <div className="card p-5 shadow">
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
          <div className="form-group">
            <label htmlFor="seatnumber">Seatnumber</label>
            <select name="seatnumber"ref={register} onChange={onChangeSeat} className={`form-control ${errors.numberOfTickets ? 'is-invalid' : ''}`}>
                                {open.map(i => 
                                    <option key={i.seatnumber} value={i.seatnumber}>{i.seatnumber}</option>
                                )}
                            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="username"
              ref={register}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              ref={register}
              onChange={onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Contactno</label>
            <input
              className="form-control"
              type="number"
              name="contactnumber"
              ref={register}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Moviename</label>
            <input
              className="form-control"
              type="text"
              name="moviename"
              ref={register}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary">
              BookNow
            </button>
          </div>
          <hr></hr>
          <div>
          <button type="submit" className="btn btn-primary mr-1" onClick={home}>
                        Return to HomePage
                    </button>
          </div>  
        </form>
      </div>
    </div>
    <div className="col-sm-2" />
  </div>
);

}
export default Booking;