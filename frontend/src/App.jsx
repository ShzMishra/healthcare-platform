import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";


import MainLayout from "./layouts/MainLayout";


import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ThemeSelect from "./pages/ThemeSelect";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Marketplace from "./pages/Marketplace";
import PatientDashboard from "./pages/PatientDashboard";
import ProviderProfile from "./pages/ProviderProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingPage from "./pages/BookingPage";

function App(){


return (

<BrowserRouter>


<Routes>


<Route path="/" element={<MainLayout/>}>


<Route index element={<Home/>}/>

<Route path="services" element={<Services/>}/>

<Route path="about" element={<About/>}/>

<Route path="contact" element={<Contact/>}/>


<Route path="login" element={<Login/>}/>

<Route path="register" element={<Register/>}/>


<Route path="theme" element={<ThemeSelect/>}/>

<Route path="/admin" element={<ProtectedRoute roles={["ADMIN","SUPER_ADMIN"]}><AdminDashboard/></ProtectedRoute>}/>
<Route path="/super-admin" element={<ProtectedRoute roles={["SUPER_ADMIN"]}><SuperAdminDashboard/></ProtectedRoute>}/>
<Route path="/provider" element={<ProtectedRoute roles={["PROVIDER"]}><ProviderDashboard/></ProtectedRoute>}/>
<Route path="/marketplace" element={<Marketplace/>}/>
<Route path="/dashboard" element={<ProtectedRoute roles={["PATIENT"]}><PatientDashboard/></ProtectedRoute>}/>
<Route path="/provider/:id" element={<ProviderProfile/>}/>
<Route path="/book/:providerId/:serviceId" element={<BookingPage/>}/>
</Route>


</Routes>


</BrowserRouter>

)

}


export default App;
