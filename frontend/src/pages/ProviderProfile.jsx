import {useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";


function ProviderProfile(){


const {id}=useParams();

const navigate = useNavigate();


const [provider,setProvider]=useState(null);

const [error,setError]=useState("");



useEffect(()=>{

loadProvider();

},[]);





async function loadProvider(){


try{


const res =
await axios.get(

`http://localhost:5000/api/market/provider/${id}`

);


setProvider(res.data);


}

catch(error){

console.log(error);

setError("Unable to load provider profile");

}


}







if(error){

return (

<div className="profile-page">

<h2>
{error}
</h2>

</div>

)

}







if(!provider){

return (

<div className="profile-page">

<h2>
Loading...
</h2>

</div>

)

}







return (


<div className="profile-page">





<div className="profile-header">



<h1>
{provider.name}
</h1>




<p>
{provider.type}
</p>



<p>
📍 {provider.city}
</p>





<div className="provider-actions">





{
provider.phone &&


<a

href={`tel:${provider.phone}`}

className="contact-btn call-btn"

>

📞 Call Provider

</a>


}







{
provider.whatsapp &&


<a


href={
`https://wa.me/${provider.whatsapp.replace(/\D/g,"")}`
}


target="_blank"

rel="noreferrer"

className="contact-btn whatsapp-btn"


>


🟢 WhatsApp


</a>


}



</div>





</div>









<div className="profile-section">



<h2>
Available Services
</h2>






<div className="service-grid">





{

provider.services?.length > 0 ?



provider.services.map(service=>(



<div

className="service-card"

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


className="book-btn"


onClick={()=>{


navigate(

`/book/${provider.id}/${service.id}`

);


}}


>


Book Appointment


</button>







</div>



))





:



<p>
No services available
</p>



}





</div>





</div>









<div className="profile-section">



<h2>

Reviews

</h2>





{


provider.reviews?.length > 0 ?



provider.reviews.map(review=>(



<div

className="review-card"

key={review.id}

>




<h3>

⭐ {review.rating}

</h3>




<p>

{review.comment}

</p>




</div>



))



:



<p>
No reviews yet
</p>



}







</div>








</div>


)


}



export default ProviderProfile;