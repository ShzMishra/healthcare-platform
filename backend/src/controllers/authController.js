const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../config/database");



exports.register = async(req,res)=>{

try{


const {
name,
email,
phone,
password,
accountType,
providerType,
address,
city,
pincode
}=req.body;



const exists =
await prisma.user.findFirst({
where:{
email
}
});


if(exists){

return res.status(400).json({
message:"Account already exists"
});

}



const hash =
await bcrypt.hash(password,10);



const user =
await prisma.user.create({

data:{

name,

email,

phone,

password:hash,


role:
accountType==="PARTNER"
?
"PROVIDER"
:
"PATIENT",

patient:
accountType!=="PARTNER"
?
{
create:{}
}
:
undefined

}

});




// If partner create provider request


if(accountType==="PARTNER"){


await prisma.provider.create({

data:{


userId:user.id,

name,

type:providerType,

address,

city,

pincode,

status:"PENDING"


}

});


}



res.json({

message:
accountType==="PARTNER"
?
"Partner request submitted. Wait for approval."
:
"Patient account created",

user

});



}

catch(error){

res.status(500).json({

error:error.message

});

}


};



exports.login = async(req,res)=>{


try{


const {

email,

password

}=req.body;



const user = await prisma.user.findUnique({

where:{
email
}

});



if(!user){

return res.status(404).json({

message:"User not found"

});

}



const match = await bcrypt.compare(

password,

user.password

);



if(!match){

return res.status(401).json({

message:"Invalid password"

});

}




const token = jwt.sign(

{

id:user.id,

role:user.role

},

process.env.JWT_SECRET,

{

expiresIn:"7d"

}

);



res.json({

token,

user

});



}

catch(error){

res.status(500).json({

error:error.message

});

}


};



exports.updateTheme = async(req,res)=>{


try{


const {

theme

}=req.body;


if(!["LIGHT","DARK"].includes(theme)){

return res.status(400).json({

message:"Invalid theme"

});

}


const user =
await prisma.user.update({

where:{
id:req.user.id
},

data:{
theme
},

select:{
id:true,
name:true,
email:true,
phone:true,
role:true,
theme:true,
createdAt:true,
updatedAt:true
}

});


res.json({

message:"Theme updated",

user

});


}

catch(error){

res.status(500).json({

error:error.message

});

}


};
