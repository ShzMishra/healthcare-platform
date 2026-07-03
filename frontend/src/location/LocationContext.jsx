import {
createContext,
useContext,
useEffect,
useState
}
from "react";


const LocationContext=createContext();



export function LocationProvider({children}){


const [location,setLocation]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{


detectLocation();


},[]);




function detectLocation(){



if(!navigator.geolocation){


setLocation({

city:"Vasai-Virar",

pincode:"401xxx"

});


setLoading(false);

return;

}





navigator.geolocation.getCurrentPosition(


(position)=>{


const {

latitude,
longitude

}=position.coords;



/*
Later backend will reverse-geocode
latitude longitude

For initial launch:
Vasai-Virar mapping
*/


setLocation({

latitude,
longitude,

city:"Vasai-Virar",

pincode:"401xxx"

});



setLoading(false);



},


()=>{


// permission denied fallback


setLocation({

city:"Vasai-Virar",

pincode:"401xxx"

});


setLoading(false);


}



);



}




return (

<LocationContext.Provider

value={{

location,
loading

}}

>

{children}

</LocationContext.Provider>


)


}



export function useLocation(){

return useContext(LocationContext);

}