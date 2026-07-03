const express=require("express");

const router=express.Router();

const auth=
require("../middleware/authMiddleware");

const {

search,
getRecentSearches,
getTrendingSearches

}=require("../controllers/searchController");

router.get(
"/",
auth,
search
);

router.get(
"/recent",
auth,
getRecentSearches
);

router.get(
"/trending",
auth,
getTrendingSearches
);

module.exports=router;
