import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";


function Login(){


const navigate = useNavigate();

const {login}=useAuth();



const [form,setForm]=useState({

email:"",
password:""

});




async function submit(e){

e.preventDefault();


try{


const result = await login(form);



const role = result.user.role;



if(role==="SUPER_ADMIN"){

navigate("/super-admin");

}

else if(role==="ADMIN"){

navigate("/admin");

}

else if(role==="PROVIDER"){

navigate("/provider");

}

else{


navigate("/dashboard");

}



}

catch(error){

alert("Invalid email or password");

}


}





return (

<div className="container page">


<h1>
Login
</h1>


<form 
className="auth-form"
onSubmit={submit}
>


<input

placeholder="Email"

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

/>



<input

type="password"

placeholder="Password"

onChange={(e)=>

setForm({

...form,

password:e.target.value

})

}

/>



<button className="primary-btn">

Login

</button>


</form>


</div>

)

}



export default Login;
