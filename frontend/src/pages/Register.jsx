import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Register() {


const {register}=useAuth();
const navigate=useNavigate();



const [accountType,setAccountType]=useState("PATIENT");


const [form,setForm]=useState({

name:"",
email:"",
phone:"",
password:"",

providerType:"",
address:"",
city:"",
pincode:""

});



function update(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}



async function submit(e){

e.preventDefault();


try{


await register({

...form,

accountType

});


alert(

accountType==="PARTNER"

?

"Partner application submitted. We will verify your details."

:

"Account created successfully"

);



navigate("/login");


}

catch(err){

alert("Registration failed");

}


}




return (

<div className="register-page">


<div className="register-card">



<div className="register-header">

<h1>Create Account</h1>

<p>
Join our trusted healthcare network
</p>

</div>



<div className="type-switch">


<button

className={accountType==="PATIENT"?"active":""}

onClick={()=>setAccountType("PATIENT")}

>

Patient

</button>



<button

className={accountType==="PARTNER"?"active":""}

onClick={()=>setAccountType("PARTNER")}

>

Healthcare Partner

</button>



</div>




<form onSubmit={submit}>


<label>
Full Name
</label>


<input

name="name"

placeholder="Enter your name"

onChange={update}

/>



<label>
Email
</label>


<input

name="email"

type="email"

placeholder="Enter email"

onChange={update}

/>



<label>
Mobile Number
</label>


<input

name="phone"

placeholder="Enter mobile number"

onChange={update}

/>



<label>
Password
</label>


<input

name="password"

type="password"

placeholder="Create password"

onChange={update}

/>




{
accountType==="PARTNER" &&

<div className="partner-box">


<h3>
Healthcare Partner Details
</h3>



<label>
Partner Type
</label>


<select

name="providerType"

onChange={update}

>

<option>
Select
</option>

<option value="DOCTOR">
Doctor
</option>

<option value="HOSPITAL">
Hospital
</option>

<option value="CLINIC">
Clinic
</option>

<option value="LAB">
Lab
</option>


</select>



<label>
Address
</label>


<input

name="address"

placeholder="Business address"

onChange={update}

/>



<label>
City
</label>


<input

name="city"

placeholder="City"

onChange={update}

/>



<label>
Pincode
</label>


<input

name="pincode"

placeholder="Pincode"

onChange={update}

/>



</div>

}



<button className="register-btn">

Create Account

</button>



<p className="terms">

By continuing you agree to our Terms & Privacy Policy

</p>



</form>


</div>



</div>


)

}


export default Register;