import {useEffect,useState} from "react";
import axios from "axios";


function Marketplace(){


const [providers,setProviders]=useState([]);

const [search,setSearch]=useState("");




useEffect(()=>{

load();

},[]);




async function load(){


const res =
await axios.get(

`https://healthcare-backend-bxwj.onrender.com/api/market/providers?search=${search}`

);


setProviders(res.data);

}




return (

<div className="market-page">


<h1>
Find Healthcare Services
</h1>


<div className="search-box">


<input

placeholder="Search hospital, clinic, lab..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>


<button onClick={load}>
Search
</button>


</div>





<div className="provider-list">



{

providers.map(p=>(


<div className="provider-card"
key={p.id}>


<h2>
{p.name}
</h2>


<p>
{p.type}
</p>


<p>
📍 {p.city}
</p>


<h3>
Services
</h3>


{

p.services.map(s=>(

<div key={s.id}>

{s.name}

₹{s.price}

</div>

))

}



<button

onClick={()=>{

window.location.href=
`/provider/${p.id}`

}}

>

View Details

</button>

</div>


))


}



</div>



</div>

)

}


export default Marketplace;