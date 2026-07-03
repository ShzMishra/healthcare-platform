import { createContext, useContext, useEffect, useState } from "react";

import api from "../api/api";


const ThemeContext = createContext();



function getStoredTheme(){

const storedUser =
JSON.parse(localStorage.getItem("user")) || null;

return storedUser?.theme || localStorage.getItem("theme") || "LIGHT";

}



function saveUserTheme(theme){

const storedUser =
JSON.parse(localStorage.getItem("user")) || null;

if(storedUser){

localStorage.setItem(
"user",
JSON.stringify({
...storedUser,
theme
})
);

}

}



async function persistUserTheme(theme){

const token =
localStorage.getItem("token");

if(!token){

return;

}

try{

const res =
await api.put(

"/auth/theme",

{
theme
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

localStorage.setItem("user",JSON.stringify(res.data.user));

}

catch(error){

console.log(error);

}

}



export function ThemeProvider({children}){


const [theme,setTheme] = useState(

getStoredTheme()

);



useEffect(()=>{


document.body.className =
theme==="DARK"
?
"dark-mode"
:
"";


localStorage.setItem(
"theme",
theme
);


},[theme]);





function toggleTheme(){

const nextTheme =
theme==="LIGHT"
?
"DARK"
:
"LIGHT";

setTheme(nextTheme);

saveUserTheme(nextTheme);

persistUserTheme(nextTheme);


}



return (

<ThemeContext.Provider

value={{
theme,
toggleTheme
}}

>

{children}

</ThemeContext.Provider>

)


}




export function useTheme(){

return useContext(ThemeContext);

}
