import {useEffect,useState} from "react";
import axios from "axios";


function AdminDashboard(){


const [providers,setProviders]=useState([]);

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");



async function loadProviders(){


const token =
localStorage.getItem("token");


try{

setError("");

const res =
await axios.get(

"https://healthcare-backend-bxwj.onrender.com/api/providers/pending",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setProviders(res.data);

}

catch(error){

setError("Unable to load pending partner requests");

}

finally{

setLoading(false);

}


}



useEffect(()=>{

loadProviders();

},[]);



return (

<div className="admin-page">


<h1>
Admin Dashboard
</h1>


<div className="admin-card">


<h2>
Pending Healthcare Partners
</h2>


{
loading &&

<p>
Loading requests...
</p>

}


{
error &&

<p>
{error}
</p>

}


{
!loading &&
!error &&
providers.length===0 &&

<p>
No pending requests
</p>

}


{
!loading &&
!error &&
providers.map((p)=>(


<div className="provider-box" key={p.id}>


<h3>
{p.name}
</h3>


<p>
Type: {p.type}
</p>


<p>
City: {p.city}
</p>


<p>
Status: {p.status}
</p>


</div>


))

}


</div>


</div>

)

}


export default AdminDashboard;
