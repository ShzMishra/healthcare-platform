const express=require("express");

const router=express.Router();


const auth =
require("../middleware/authMiddleware");


const controller =
require("../controllers/availabilityController");



router.post(
"/",
auth,
controller.createAvailability
);



router.get(
"/",
auth,
controller.getAvailability
);



router.put(
"/:id",
auth,
controller.updateAvailability
);



router.delete(
"/:id",
auth,
controller.deleteAvailability
);



module.exports=router;