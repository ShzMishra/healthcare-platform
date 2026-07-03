const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



exports.createAvailability = async(req,res)=>{

try{


const providerId = req.user.id;


const {
dayOfWeek,
startTime,
endTime,
slotDuration
}=req.body;



const provider =
await prisma.provider.findUnique({

where:{
userId:providerId
}

});


if(!provider){

return res.status(404).json({
message:"Provider not found"
});

}



const availability =
await prisma.providerAvailability.create({

data:{


providerId:provider.id,

dayOfWeek,

startTime,

endTime,

slotDuration:Number(slotDuration)

}

});



res.json(availability);



}

catch(error){

res.status(500).json({
message:error.message
});

}


};







exports.getAvailability = async(req,res)=>{


try{


const providerId=req.user.id;



const provider =
await prisma.provider.findUnique({

where:{
userId:providerId
}

});



const data =
await prisma.providerAvailability.findMany({

where:{
providerId:provider.id
}

});



res.json(data);


}

catch(error){

res.status(500).json({
message:error.message
});

}


};








exports.updateAvailability = async(req,res)=>{


try{


const {id}=req.params;


const updated =
await prisma.providerAvailability.update({

where:{
id
},


data:req.body

});


res.json(updated);



}

catch(error){

res.status(500).json({
message:error.message
});

}


};









exports.deleteAvailability = async(req,res)=>{


try{


const {id}=req.params;


await prisma.providerAvailability.delete({

where:{
id
}

});


res.json({
message:"Availability deleted"
});


}

catch(error){

res.status(500).json({
message:error.message
});

}


};