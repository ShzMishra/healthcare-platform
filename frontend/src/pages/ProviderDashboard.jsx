import {useEffect,useState} from "react";
import axios from "axios";


function ProviderDashboard(){


const API="https://healthcare-backend-bxwj.onrender.com/api";


const token=localStorage.getItem("token");


const [provider,setProvider]=useState(null);

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");


const [services,setServices]=useState([]);

const [availability,setAvailability]=useState([]);

const [bookings,setBookings]=useState([]);

const [appointmentSearch, setAppointmentSearch]=useState("");

const [statusFilter, setStatusFilter]=useState("ALL");

const [contact,setContact]=useState({
phone:"",
whatsapp:""
});


const [newService,setNewService]=useState({

name:"",
description:"",
price:""

});

const [editingServiceId, setEditingServiceId] =
  useState(null);

const [editingSlotId, setEditingSlotId] =
  useState(null);

const [newSlot,setNewSlot]=useState({

dayOfWeek:"",
startTime:"",
endTime:"",
slotDuration:30

});

const [
  appointmentNotes,
  setAppointmentNotes
] = useState({});

async function loadAll(){


try{


const config={
headers:{
Authorization:`Bearer ${token}`
}
};



const providerRes =
await axios.get(
`${API}/provider/me`,
config
);


setProvider(providerRes.data);


setContact({

phone:providerRes.data.phone || "",

whatsapp:providerRes.data.whatsapp || ""

});



const serviceRes =
await axios.get(
`${API}/provider/services`,
config
);


setServices(serviceRes.data);



const slotRes =
await axios.get(
`${API}/provider/availability`,
config
);


setAvailability(slotRes.data);



const bookingRes =
await axios.get(
`${API}/bookings/provider`,
config
);


setBookings(bookingRes.data);



}
catch(err){

console.log(err);

setError("Unable to load dashboard");

}
finally{

setLoading(false);

}


}




useEffect(()=>{

loadAll();

},[]);






async function saveService(){


try{


const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

if (editingServiceId) {
  await axios.put(
    `${API}/provider/services/${editingServiceId}`,
    newService,
    config
  );
} else {
  await axios.post(
    `${API}/provider/services`,
    newService,
    config
  );
}


setNewService({

name:"",
description:"",
price:""

});

setEditingServiceId(null);


loadAll();


}

catch(err){

alert(
err.response?.data?.message ||
"Service failed"
);

}


}







async function deleteService(id){


await axios.delete(

`${API}/provider/services/${id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


loadAll();

}





async function saveAvailability(){


const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

if (editingSlotId) {
  await axios.put(
    `${API}/provider/availability/${editingSlotId}`,
    newSlot,
    config
  );
} else {
  await axios.post(
    `${API}/provider/availability`,
    newSlot,
    config
  );
}


setNewSlot({

dayOfWeek:"",
startTime:"",
endTime:"",
slotDuration:30

});
setEditingSlotId(null);

loadAll();

}





async function deleteAvailability(id){


await axios.delete(

`${API}/provider/availability/${id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


loadAll();

}





async function updateContact(){


await axios.put(

`${API}/provider/contact`,

contact,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


alert("Contact updated");


loadAll();

}





async function updateBookingStatus(id,status){


await axios.put(

`${API}/bookings/${id}/status`,

{status},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


loadAll();

}

if(loading)
return <h2>Loading...</h2>;

const approved =
provider?.status==="APPROVED";



const today =
new Date().toDateString();

const filteredBookings =
bookings.filter((booking)=>{

  const patient =
    booking.patient?.user?.name
      ?.toLowerCase() || "";

  const service =
    booking.service?.name
      ?.toLowerCase() || "";

  const search =
    appointmentSearch
      .toLowerCase();

  const matchesSearch =
    patient.includes(search)
    ||
    service.includes(search);

  let matchesStatus = true;

  if (
    statusFilter !== "ALL"
  ) {

    if (
      statusFilter === "TODAY"
    ) {

      matchesStatus =
        new Date(
          booking.date
        ).toDateString()
        === today;

    }
    else {

      matchesStatus =
        booking.status ===
        statusFilter;

    }
  }

  return (
    matchesSearch &&
    matchesStatus
  );

});

const totalAppointments =
bookings.length;

const pendingAppointments =
bookings.filter(
  b => b.status === "PENDING"
).length;

const confirmedAppointments =
bookings.filter(
  b => b.status === "CONFIRMED"
).length;

const completedAppointments =
bookings.filter(
  b => b.status === "COMPLETED"
).length;

const cancelledAppointments =
bookings.filter(
  b => b.status === "CANCELLED"
).length;

const todayAppointments =
bookings.filter(
  b =>
    new Date(b.date)
      .toDateString()
      ===
    new Date()
      .toDateString()
).length;

return (

<div className="provider-dashboard">
<div className="provider-top">

<h1>
Provider Dashboard
</h1>

<div className="status-card">

<p>
Account Status
</p>

<h3>
{provider?.status}
</h3>
</div>
</div>

<div className="dashboard-grid">

<div className="side-card">

<h2>
{provider?.name}
</h2>

<div className="stat">

<p>
Type
</p>

<h3>
{provider?.type}
</h3>

</div>

<div className="stat">

<p>
City
</p>

<h3>
{provider?.city}
</h3>

</div>

</div>

<div className="main-card">

<h2>
Welcome Healthcare Partner
</h2>

<p>
{approved?
"Your account is approved."
:
"Your account is under review."
}

</p>

</div>

</div>

{approved &&

<>

<div className="main-card">


<h2>
Service Management
</h2>

<input

placeholder="Service Name"

value={newService.name}

onChange={
e=>setNewService({
...newService,
name:e.target.value
})
}

/>



<input

placeholder="Description"

value={newService.description}

onChange={
e=>setNewService({
...newService,
description:e.target.value
})
}

/>

<input

placeholder="Price"

type="number"

value={newService.price}

onChange={
e=>setNewService({
...newService,
price:e.target.value
})
}

/>

<button onClick={saveService}>
  {
    editingServiceId
      ? "Update Service"
      : "Add Service"
  }
</button>

<div className="service-grid">


{
services.map(service=>(


<div className="service-card"
key={service.id}
>

<h3>
{service.name}
</h3>


<p>
{service.description}
</p>


<h2>
₹ {service.price}
</h2>

<button
  onClick={() => {
    setEditingServiceId(
      service.id
    );

    setNewService({
      name: service.name,
      description:
        service.description,
      price: service.price
    });
  }}
>
  Update
</button>

<button

onClick={()=>deleteService(service.id)}

>

Delete

</button>

</div>

))

}
</div>

</div>

<div className="main-card availability-section">


<h2>
Appointment Availability
</h2>

<select

value={newSlot.dayOfWeek}

onChange={
e=>setNewSlot({
...newSlot,
dayOfWeek:e.target.value
})
}

>

<option>
Select Day
</option>

<option>Monday</option>
<option>Tuesday</option>
<option>Wednesday</option>
<option>Thursday</option>
<option>Friday</option>
<option>Saturday</option>
<option>Sunday</option>

</select>



<input
type="time"
value={newSlot.startTime}
onChange={
e=>setNewSlot({
...newSlot,
startTime:e.target.value
})
}
/>



<input
type="time"
value={newSlot.endTime}
onChange={
e=>setNewSlot({
...newSlot,
endTime:e.target.value
})
}
/>



<button onClick={saveAvailability}>
{
  editingSlotId
    ? "Update Availability"
    : "Save Availability"
}
</button>


{
availability.map(slot=>(

<div
className="availability-card"
key={slot.id}
>

<h3>
{slot.dayOfWeek}
</h3>

<p>
{slot.startTime} - {slot.endTime}
</p>

<button
  onClick={() => {
    setEditingSlotId(
      slot.id
    );

    setNewSlot({
      dayOfWeek:
        slot.dayOfWeek,
      startTime:
        slot.startTime,
      endTime:
        slot.endTime,
      slotDuration:
        slot.slotDuration
    });
  }}
>
  Update
</button>

<button
onClick={()=>deleteAvailability(slot.id)}
>
Delete
</button>


</div>

))

}
</div>

<div className="main-card">


<h2>
Contact Details
</h2>

<input

value={contact.phone}

placeholder="Phone"

onChange={
e=>setContact({
...contact,
phone:e.target.value
})
}

/>

<input

value={contact.whatsapp}

placeholder="WhatsApp"

onChange={
e=>setContact({
...contact,
whatsapp:e.target.value
})
}

/>

<button onClick={updateContact}>
Save Contact
</button>


</div>

<div className="main-card appointments-section">

<h2>
  Appointments Details
</h2>
<br></br>
<div className="stats-grid">

  <div className="stat-card total-card">
    <h3>Total</h3>
    <h1>
      {totalAppointments}
    </h1>
  </div>

  <div className="stat-card pending-card">
    <h3>Pending</h3>
    <h1>
      {pendingAppointments}
    </h1>
  </div>

  <div className="stat-card confirmed-card">
    <h3>Confirmed</h3>
    <h1>
      {confirmedAppointments}
    </h1>
  </div>

  <div className="stat-card completed-card">
    <h3>Completed</h3>
    <h1>
      {completedAppointments}
    </h1>
  </div>

  <div className="stat-card cancelled-card">
    <h3>Cancelled</h3>
    <h1>
      {cancelledAppointments}
    </h1>
  </div>

  <div className="stat-card today-card">
    <h3>Today</h3>

    <h1>
      {todayAppointments}
    </h1>
  </div>

</div>

<div className="section-header">
    <div>
      <p className="section-subtitle">
        <h3>Manage Patient bookings and Appointments </h3>
      </p>
    </div>
  </div>

<div className="filter-bar">

  <select
    value={statusFilter}
    onChange={(e)=>
      setStatusFilter(
        e.target.value
      )
    }
  >
    <option value="ALL">
      All Appointments
    </option>

    <option value="PENDING">
      Pending
    </option>

    <option value="CONFIRMED">
      Confirmed
    </option>

    <option value="COMPLETED">
      Completed
    </option>

    <option value="CANCELLED">
      Cancelled
    </option>

    <option value="TODAY">
      Today
    </option>

  </select>

</div>

<input
  type="text"
  placeholder="Search by Patient or Services..."
  value={appointmentSearch}
  onChange={(e) =>
    setAppointmentSearch(
      e.target.value
    )
  }
/>

{
filteredBookings.length === 0 &&

<div className="appointment-box">

  <p>
    No appointments found.
  </p>

</div>
}

{
filteredBookings.map(b=>(


<div
  className="appointment-card professional-card"
  key={b.id}
>

  <div className="appointment-top">

    <div>
      <h3>
        {b.patient?.user?.name}
      </h3>

      <p className="appointment-subtitle">
      </p>
    </div>

    <span
      className={`status-badge status-${b.status.toLowerCase()}`}
    >
      {b.status}
    </span>

  </div>


  <p>
    <strong>Appointment ID:</strong>{" "}
    {b.id}
  </p>

  <p>
    <strong>Service:</strong>{" "}
    {b.service?.name}
  </p>

  <p>
    <strong>Date:</strong>{" "}
    {new Date(b.date).toLocaleDateString()}
  </p>

  <p>
    <strong>Time:</strong>{" "}
    {b.time?.time || b.time}
  </p>

  {
    b.patient?.user?.phone &&
    <p>
      <strong>Phone:</strong>{" "}
      {b.patient.user.phone}
    </p>
  }


  <div className="appointment-actions">
    <textarea

    className="appointment-note"

    placeholder=
    "Private notes about patient..."

    value={
    appointmentNotes[b.id] || ""
    }

    onChange={(e)=>
    setAppointmentNotes({

    ...appointmentNotes,

    [b.id]:
    e.target.value

    })
    }

    />
    {
      b.patient?.user?.phone &&
      <>
        <a
          href={`tel:${b.patient.user.phone}`}
          className="contact-btn call-btn"
        >
          📞 Call Patient
        </a>

        <a
          href={`https://wa.me/${b.patient.user.phone}`}
          target="_blank"
          rel="noreferrer"
          className="contact-btn whatsapp-btn"
        >
          🟢 WhatsApp Patient
        </a>
      </>
    }

      <>
        {
          b.status === "PENDING" &&
          <>
            <button
              className="action-btn"
              onClick={() =>
                updateBookingStatus(
                  b.id,
                  "CONFIRMED"
                )
              }
            >
              Confirm
            </button>

            <button
              className="action-btn"
              onClick={() =>
                updateBookingStatus(
                  b.id,
                  "CANCELLED"
                )
              }
            >
              Reject
            </button>
          </>
        }
      </>

    {
      b.status === "CONFIRMED" &&
      <button
        className="contact-btn complete-btn"
        onClick={() =>
          updateBookingStatus(
            b.id,
            "COMPLETED"
          )
        }
      >
        ✓ Mark Completed
      </button>
    }

  </div>

</div>


))

}



</div>



</>


}




</div>

);


}

export default ProviderDashboard;