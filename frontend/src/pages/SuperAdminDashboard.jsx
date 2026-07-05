import {useEffect,useState} from "react";
import axios from "axios";


function SuperAdminDashboard(){


const [providers,setProviders]=useState([]);



async function loadProviders(){


const token =
localStorage.getItem("token");



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





async function approve(id){


const token =
localStorage.getItem("token");


await axios.put(

`https://healthcare-backend-bxwj.onrender.com/api/providers/approve/${id}`,

{},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



loadProviders();


}





async function reject(id){


const token =
localStorage.getItem("token");


await axios.put(

`https://healthcare-backend-bxwj.onrender.com/api/providers/reject/${id}`,

{},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



loadProviders();


}





useEffect(()=>{

loadProviders();

},[]);






return (

<div className="admin-page">


<h1>
Super Admin Control Center
</h1>




<div className="admin-card">


<h2>
Pending Healthcare Partners
</h2>



{

providers.length===0 ?

<p>
No pending requests
</p>


:

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



<button
onClick={()=>approve(p.id)}
>
Approve
</button>


<button
onClick={()=>reject(p.id)}
>
Reject
</button>



</div>


))


}



</div>


</div>

)

}


export default SuperAdminDashboard;