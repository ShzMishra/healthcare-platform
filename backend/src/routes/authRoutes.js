const express=require("express");

const router=express.Router();

const auth=require("../middleware/authMiddleware");


const {

register,
login,
updateTheme

}=require("../controllers/authController");



router.post("/register",register);

router.post("/login",login);

router.put("/theme",auth,updateTheme);



module.exports=router;
