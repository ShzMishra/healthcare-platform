const express=require("express");

const router=express.Router();
const providerController = require("../controllers/providerController");
const { searchProviders } = require("../controllers/providerSearchController");
const auth =
require("../middleware/authMiddleware");


const allowRoles =
require("../middleware/roleMiddleware");


const {

getPendingProviders,
approveProvider,
rejectProvider,
getProviderDetails


}=require("../controllers/providerController");





router.get(

"/pending",

auth,

allowRoles("SUPER_ADMIN","ADMIN"),

getPendingProviders

);





router.put(

"/approve/:id",

auth,

allowRoles("SUPER_ADMIN"),

approveProvider

);





router.put(

"/reject/:id",

auth,

allowRoles("SUPER_ADMIN"),

rejectProvider

);


router.put(
"/contact",
auth,
providerController.updateContact
);


router.post(
"/services",
auth,
providerController.addService
);


router.get(
"/services",
auth,
providerController.getServices
);


router.delete(
"/services/:id",
auth,
providerController.deleteService
);

router.put(
  "/services/:id",
  auth,
  providerController.updateService
);

router.put(
  "/availability/:id",
  auth,
  providerController.updateAvailability
);

router.get(
  "/search",
  searchProviders
);

router.get(
  "/:id",
  getProviderDetails
);
module.exports=router;