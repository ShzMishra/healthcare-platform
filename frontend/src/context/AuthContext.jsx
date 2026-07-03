import {
createContext,
useContext,
useState
}
from "react";


import api from "../api/api";



const AuthContext=createContext();



export function AuthProvider({children}){


const [user,setUser]=useState(

JSON.parse(localStorage.getItem("user")) || null

);



async function register(data){


const res = await api.post(

"/auth/register",

data

);


return res.data;


}




async function login(data){


const res = await api.post(

"/auth/login",

data

);



localStorage.setItem("user",JSON.stringify(res.data.user));

localStorage.setItem("theme",res.data.user.theme || "LIGHT");



localStorage.setItem("token",res.data.token);

const role = res.data.user.role;


if(role==="PATIENT"){

window.location.href="/dashboard";

}


else if(role==="PROVIDER"){

window.location.href="/provider";

}


else if(role==="ADMIN"){

window.location.href="/admin";

}


else if(role==="SUPER_ADMIN"){

window.location.href="/super-admin";

}


setUser(res.data.user);



return res.data;


}



function logout(){


localStorage.clear();


setUser(null);


}



return (

<AuthContext.Provider

value={{

user,

register,

login,

logout

}}

>


{children}


</AuthContext.Provider>


)

}



export function useAuth(){

return useContext(AuthContext);

}
