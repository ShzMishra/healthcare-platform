const express=require("express");

const router=express.Router();


const {

getProviders

}=require("../controllers/marketController");

const {

getProviderDetails

}=require("../controllers/providerController");

router.get(
"/providers",
getProviders
);

router.get(

"/provider/:id",

getProviderDetails

);

module.exports=router;