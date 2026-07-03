const express=require("express");

const router=express.Router();

const auth =
require("../middleware/authMiddleware");

const {
getMyProvider
}
=
require("../controllers/providerProfileController");



router.get(

"/me",

auth,

getMyProvider

);



module.exports=router;