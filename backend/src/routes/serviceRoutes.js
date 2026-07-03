const express=require("express");

const router=express.Router();


const auth =
require("../middleware/authMiddleware");

const allowRoles =
require("../middleware/roleMiddleware");


const {

createService,

getMyServices,

deleteService

}=require("../controllers/serviceController");





router.post(

"/",

auth,
allowRoles("PROVIDER"),

createService

);





router.get(

"/my",

auth,
allowRoles("PROVIDER"),

getMyServices

);





router.delete(

"/:id",

auth,
allowRoles("PROVIDER"),

deleteService

);



module.exports=router;
