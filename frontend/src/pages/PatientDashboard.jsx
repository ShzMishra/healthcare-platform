import {useState,useEffect} from "react";
import axios from "axios";


function PatientDashboard(){


const [search,setSearch]=useState("");

const [results,setResults]=useState([]);

const [recent,setRecent]=useState([]);

const [trending,setTrending]=useState([]);


const [appointments,setAppointments]=useState([]);





useEffect(()=>{

loadRecent();

loadTrending();

loadAppointments();


},[]);






async function loadRecent(){

const token =
localStorage.getItem("token");


try{

const res =
await axios.get(

"http://localhost:5000/api/search/recent",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setRecent(res.data);


}

catch(error){

console.log(error);

}


}








async function loadTrending(){


const token =
localStorage.getItem("token");


try{


const res =
await axios.get(

"http://localhost:5000/api/search/trending",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setTrending(res.data);


}

catch(error){

console.log(error);

}


}







async function loadAppointments(){


try{


const token =
localStorage.getItem("token");



const res =
await axios.get(

"http://localhost:5000/api/bookings/patient",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



setAppointments(res.data);


}

catch(error){

console.log(error);

}


}








async function handleSearch(value){


setSearch(value);



if(value.length<1){

setResults([]);

return;

}



const token =
localStorage.getItem("token");



try{


const res =
await axios.get(

`http://localhost:5000/api/search?query=${value}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setResults(res.data);


}

catch(error){

console.log(error);

}


}









return (


<div className="patient-home">





<div className="patient-hero">


<h1>
Healthcare at your fingertips 👋
</h1>


<p>
Find doctors, hospitals, clinics and labs near you
</p>





<div className="search-container">



<input


placeholder="Search doctors, hospitals, labs..."


value={search}


onChange={
e=>handleSearch(e.target.value)
}


/>





{

results.length>0 &&


<div className="search-dropdown">



{

results.map(item=>(


<div

className="search-item"

key={item.id}

>


<div>

<h3>
{item.name}
</h3>


<p>
📍 {item.city}
</p>


<p>
{item.type}
</p>


</div>




<button

onClick={()=>{

window.location.href =
`/provider/${item.id}`

}}

>

View Details

</button>



</div>


))

}



</div>


}




</div>


</div>









{
recent.length>0 &&


<div className="section">


<h2>
Recent Searches
</h2>


<div className="chips">


{

recent.map(r=>(

<div
className="chip"
key={r.id}
>

🕒 {r.query}

</div>

))

}


</div>


</div>

}








{
trending.length>0 &&


<div className="section">


<h2>
Trending Searches
</h2>


<div className="chips">


{

trending.map(item=>(


<button

className="chip"

key={item.id}

onClick={()=>handleSearch(item.query)}

>


{item.query}


</button>


))

}



</div>


</div>


}









<div className="section">


<h2>
Explore Healthcare
</h2>



<div className="category-grid">



<div className="category-card">

<h2>🩺</h2>

<h3>Doctors</h3>

</div>


<div className="category-card">

<h2>🏥</h2>

<h3>Hospitals</h3>

</div>


<div className="category-card">

<h2>🧪</h2>

<h3>Labs</h3>

</div>


<div className="category-card">

<h2>💊</h2>

<h3>Pharmacy</h3>

</div>



</div>


</div>









<div className="section">


<h2>
Your Appointments
</h2>





{

appointments.length===0 ?


<div className="appointment-box">


<p>
No upcoming appointments
</p>


<button

onClick={()=>{

window.location.href="/marketplace"

}}

>

Book Appointment

</button>


</div>



:



<div className="appointment-list">



{

appointments.map(item=>(


<div
className="appointment-box"
key={item.id}
>

<h3>
🩺 {item.provider?.name}
</h3>

<p>
Service:
<strong>
{" "}
{item.service?.name}
</strong>
</p>

<p>
Booking ID:
<strong>
{" "}
#{item.id.slice(-6)}
</strong>
</p>

<p>
Provider Type:
<strong>
{" "}
{item.provider?.type}
</strong>
</p>

<p>
📅
{" "}
{new Date(
item.date
).toLocaleDateString()}
</p>

<p>
⏰
{" "}
{
item.time
||
new Date(
item.date
).toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})
}
</p>

<p>

Status:

<span
className={`status-${item.status.toLowerCase()}`}
>

{" "}
{item.status}

</span>

</p>

{
item.status==="CONFIRMED" &&

<div className="appointment-contact">

{
item.provider?.phone &&

<a
href={`tel:${item.provider.phone}`}
className="contact-btn call-btn"
>
📞 Call Provider
</a>
}

{
item.provider?.whatsapp &&

<a
href={`https://wa.me/${item.provider.whatsapp.replace(/\D/g,"")}`}
target="_blank"
rel="noreferrer"
className="contact-btn whatsapp-btn"
>
🟢 WhatsApp
</a>
}

</div>
}

</div>


))


}



</div>


}




</div>







</div>


)


}


export default PatientDashboard;