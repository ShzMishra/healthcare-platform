import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";


function ThemeSelect(){

const {changeTheme}=useTheme();

const navigate=useNavigate();



function selectTheme(mode){

changeTheme(mode);

navigate("/");

}



return (

<div className="container page">


<h1>
Choose your appearance
</h1>


<p>
Select how you want to use our healthcare platform.
</p>



<div className="theme-options">


<button

onClick={()=>selectTheme("light")}

>

☀️ Day Mode

</button>



<button

onClick={()=>selectTheme("dark")}

>

🌙 Night Mode

</button>



</div>


</div>

)

}


export default ThemeSelect;