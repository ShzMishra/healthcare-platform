exports.getPendingProviders = async(req,res)=>{

try{


const providers =
await prisma.provider.findMany({

where:{
status:"PENDING"
},

include:{

user:true

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






exports.approveProvider = async(req,res)=>{


try{


const {id}=req.params;



const provider =
await prisma.provider.update({

where:{
id
},

data:{

status:"APPROVED"

}

});



res.json({

message:"Provider approved",

provider

});



}

catch(error){

res.status(500).json({

message:error.message

});

}


};







exports.rejectProvider = async(req,res)=>{


try{


const {id}=req.params;



const provider =
await prisma.provider.update({

where:{
id
},

data:{

status:"REJECTED"

}

});



res.json({

message:"Provider rejected",

provider

});



}

catch(error){

res.status(500).json({

message:error.message

});

}


};
// GET PROVIDER DETAILS FOR PATIENT PROFILE


exports.getProviderDetails = async(req,res)=>{


try{


const {id}=req.params;



const provider =

await prisma.provider.findUnique({

where:{
id
},


include:{


services:true,


reviews:{

include:{

patient:true

}

},


user:true


}

});



if(!provider || provider.status!=="APPROVED"){

return res.status(404).json({

message:"Provider not found"

});

}



res.json(provider);



}


catch(error){


res.status(500).json({

message:error.message

});


}


};

exports.updateContact = async(req,res)=>{


const userId=req.user.id;


const {phone,whatsapp}=req.body;



const provider =
await prisma.provider.update({

where:{
userId
},

data:{
phone,
whatsapp
}

});


res.json(provider);


}




exports.addService = async(req,res)=>{

try{


const provider =
await prisma.provider.findUnique({

where:{
userId:req.user.id
}

});


if(!provider){

return res.status(404).json({
message:"Provider not found"
});

}



const service =
await prisma.service.create({

data:{

name:req.body.name,

description:req.body.description,

price:Number(req.body.price),

providerId:provider.id

}

});


res.json(service);



}
catch(err){

console.log(err);

res.status(500).json({
message:"Service creation failed"
});

}


};





exports.getServices = async(req,res)=>{


try{


const provider =
await prisma.provider.findUnique({

where:{
userId:req.user.id
}

});



const services =
await prisma.service.findMany({

where:{
providerId:provider.id
}

});



res.json(services);


}
catch(err){

res.status(500).json({
message:"Failed"
});

}


};







exports.deleteService = async(req,res)=>{


try{


await prisma.service.delete({

where:{
id:req.params.id
}

});


res.json({
message:"Deleted"
});


}
catch(err){

res.status(500).json({
message:"Delete failed"
});

}


};

exports.updateService = async (req, res) => {
  try {
    const service =
      await prisma.service.update({
        where: {
          id: req.params.id
        },
        data: {
          name: req.body.name,
          description: req.body.description,
          price: Number(req.body.price)
        }
      });

    res.json(service);
  } catch (err) {
    res.status(500).json({
      message: "Update failed"
    });
  }
};

exports.updateAvailability = async (
  req,
  res
) => {
  try {
    const slot =
      await prisma.availability.update({
        where: {
          id: req.params.id
        },
        data: {
          dayOfWeek: req.body.dayOfWeek,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          slotDuration: Number(
            req.body.slotDuration
          )
        }
      });

    res.json(slot);
  } catch (err) {
    res.status(500).json({
      message: "Update failed"
    });
  }
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.searchProviders = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.json([]);

    const providers = await prisma.providerProfile.findMany({
      where: {
        AND: [
          {
            user: {
              is: {
                role: "PROVIDER",
              },
            },
          },
          {
            OR: [
              {
                fullName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                specialization: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                city: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      take: 10,
    });

    res.json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};