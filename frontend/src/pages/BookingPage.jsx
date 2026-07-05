import {useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";


function BookingPage(){


const {providerId,serviceId}=useParams();

const navigate = useNavigate();



const [date,setDate]=useState("");

const [slots,setSlots]=useState([]);

const [selectedSlot,setSelectedSlot]=useState("");

const [loading,setLoading]=useState(false);





async function loadSlots(value){


try{


const token =
localStorage.getItem("token");



const res =
await axios.get(

`https://healthcare-backend-bxwj.onrender.com/api/bookings/slots/${providerId}?date=${value}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



setSlots(res.data);


}

catch(error){


console.log(error);

setSlots([]);


}



}







function handleDate(e){


const value=e.target.value;


setDate(value);


setSelectedSlot("");



if(value){

loadSlots(value);

}


}









async function submitBooking(){


if(!selectedSlot){

alert("Please select appointment time");

return;

}



try{


setLoading(true);



const token =
localStorage.getItem("token");




await axios.post(

"https://healthcare-backend-bxwj.onrender.com/api/bookings/create",

{


providerId,

serviceId,


date:selectedSlot


},


{

headers:{

Authorization:`Bearer ${token}`

}

}


);





alert("Appointment request sent");


navigate("/dashboard");



}

catch(error){


console.log(error);


alert(

error.response?.data?.message ||
"Booking failed"

);


}

finally{


setLoading(false);


}



}








return (


<div className="booking-page">



<h1>
Book Appointment
</h1>





<div className="booking-card">





<label>
Select Date
</label>





<input


type="date"


value={date}


onChange={handleDate}


/>







{

date &&


<div>


<h2>
Available Slots
</h2>





<div className="slot-grid">





{

slots.length > 0 ?



slots.map(slot=>(


<button


key={slot.datetime}



className={

selectedSlot===slot.datetime

?

"slot active"

:

"slot"

}



onClick={()=>{

setSelectedSlot(slot.datetime)

}}



>


{slot.time}


</button>


))



:


<p>
No slots available
</p>



}




</div>





</div>



}








<button


disabled={loading}


onClick={submitBooking}



>


{

loading

?

"Booking..."

:

"Confirm Appointment"


}


</button>







</div>



</div>



)


}



export default BookingPage;