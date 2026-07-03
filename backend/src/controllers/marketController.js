const prisma = require("../config/database");


exports.getProviders = async(req,res)=>{


try{


const {

type,

city,

search

}=req.query;



const providers =
await prisma.provider.findMany({

where:{

status:"APPROVED",


type:type || undefined,


city:city || undefined,


name: search
?
{
contains:search,
mode:"insensitive"
}
:
undefined


},


include:{


services:true,


reviews:true


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