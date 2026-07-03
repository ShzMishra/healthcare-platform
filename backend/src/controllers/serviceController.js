const prisma = require("../config/database");


async function getProviderForUser(userId){

return prisma.provider.findFirst({

where:{
userId
}

});

}



function ensureApprovedProvider(provider,res){

if(!provider){

res.status(404).json({

message:"Provider not found"

});

return false;

}


if(provider.status!=="APPROVED"){

res.status(403).json({

message:"Provider approval required",

status:provider.status

});

return false;

}


return true;

}


// Add Service

exports.createService = async(req,res)=>{

try{


const {
name,
description,
price
}=req.body;



const provider =
await getProviderForUser(req.user.id);


if(!ensureApprovedProvider(provider,res)){

return;

}



const service =
await prisma.service.create({

data:{

name,

description,

price:Number(price),

providerId:provider.id

}

});



res.json(service);



}

catch(error){

res.status(500).json({

message:error.message

});

}

};




// Get Provider Services

exports.getMyServices = async(req,res)=>{


try{


const provider =
await getProviderForUser(req.user.id);


if(!ensureApprovedProvider(provider,res)){

return;

}



const services =
await prisma.service.findMany({

where:{
providerId:provider.id
}

});



res.json(services);



}

catch(error){

res.status(500).json({

message:error.message

});

}


};





// Delete Service


exports.deleteService = async(req,res)=>{


try{


const {id}=req.params;

const provider =
await getProviderForUser(req.user.id);


if(!ensureApprovedProvider(provider,res)){

return;

}


const service =
await prisma.service.findFirst({

where:{
id,
providerId:provider.id
}

});


if(!service){

return res.status(404).json({

message:"Service not found"

});

}


await prisma.service.delete({

where:{
id
}

});


res.json({

message:"Service deleted"

});



}

catch(error){

res.status(500).json({

message:error.message

});

}

};
