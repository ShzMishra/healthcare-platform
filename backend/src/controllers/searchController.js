const prisma = require("../config/database");

exports.search = async (req,res)=>{

try{

const {query} = req.query;

const searchQuery = query?.trim();

const userId = req.user?.id;


if(!searchQuery){

return res.json([]);
}


if(userId){

await prisma.searchHistory.create({

data:{
userId,
query:searchQuery
}

});


const analytics =
await prisma.searchAnalytics.findUnique({

where:{
query:searchQuery
}

});


if(analytics){

await prisma.searchAnalytics.update({

where:{
query:searchQuery
},

data:{
count:{
increment:1
}
}

});

}else{

await prisma.searchAnalytics.create({

data:{
query:searchQuery
}
});

}

}



const providers =
await prisma.provider.findMany({

where:{

name:{
contains:searchQuery,
mode:"insensitive"
},
status:"APPROVED"

},

take:10,

include:{
services:true
}

});


res.json(providers);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

exports.getRecentSearches = async(req,res)=>{

try{

const history =
await prisma.searchHistory.findMany({

where:{
userId:req.user.id
},

orderBy:{
createdAt:"desc"
},

take:5

});

res.json(history);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

exports.getTrendingSearches = async(req,res)=>{

try{

const searches =
await prisma.searchAnalytics.findMany({

orderBy:[
{
count:"desc"
},
{
updatedAt:"desc"
}
],

take:5

});

res.json(searches);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};
