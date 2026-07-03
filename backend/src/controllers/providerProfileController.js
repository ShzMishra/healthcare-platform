const prisma =
require("../config/database");



exports.getMyProvider =
async(req,res)=>{

try{

const provider =
await prisma.provider.findFirst({

where:{
userId:req.user.id
}

});


res.json(provider);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};