const express=require("express");

const router=express.Router();


const auth=require("../middleware/authMiddleware");

const allowRoles=require("../middleware/roleMiddleware");



router.get(
"/dashboard",

auth,

allowRoles("SUPER_ADMIN","ADMIN"),

(req,res)=>{


res.json({

message:"Admin dashboard access granted",

user:req.user

});


});



module.exports=router;