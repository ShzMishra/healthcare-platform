const { PrismaClient } = require("@prisma/client");
const sendEmail = require("../utils/sendEmail");

const prisma = new PrismaClient();



exports.createBooking = async(req,res)=>{


try{


const patientUserId = req.user.id;



const {
providerId,
serviceId,
date
}=req.body;



const patient =
await prisma.patientProfile.findUnique({

where:{
userId:patientUserId
}

});



if(!patient){

return res.status(400).json({

message:"Patient profile not found"

});

}



const patientUser =
await prisma.user.findUnique({
  where: {
    id: patientUserId
  }
});

const provider =
await prisma.provider.findUnique({
  where: {
    id: providerId
  }
});

const service =
await prisma.service.findUnique({
  where: {
    id: serviceId
  }
});

if(!provider){
  return res.status(404).json({
    message:"Provider not found"
  });
}

if(!service){
  return res.status(404).json({
    message:"Service not found"
  });
}

if(!patientUser){
  return res.status(404).json({
    message:"User not found"
  });
}

const booking =

await prisma.booking.create({

data:{


patientId:patient.id,

providerId,

serviceId,

date:new Date(date),

status:"PENDING"


}

});

await sendEmail(
  patientUser.email,

  "Appointment Request Received",

  `
  <h2>Appointment Request Received</h2>

  <p>
    Hello ${patientUser.name},
  </p>

  <p>
    Your appointment request has been received.
  </p>

  <hr>

  <p>
    <strong>Provider:</strong>
    ${provider.name}
  </p>

  <p>
    <strong>Service:</strong>
    ${service.name}
  </p>

  <p>
    <strong>Date:</strong>
    ${new Date(date).toLocaleDateString()}
  </p>

  <p>
    <strong>Status:</strong>
    Pending Approval
  </p>

  <br>

  <p>
    Thank you,
    <br>
    Healthcare Platform
  </p>
  `
);

await prisma.notification.create({

  data: {

    userId:
    provider.userId,

    title:
    "New Appointment Request",

    message:
    `${patientUser.name}
    booked
    ${service.name}`
  }
});

const providerUser =
await prisma.user.findUnique({
  where: {
    id: provider.userId
  }
});

if(providerUser){
    await sendEmail(
    providerUser.email,

    "New Appointment Request",

    `
    <h2>
        New Appointment Request
    </h2>

    <p>
        ${patientUser.name}
        booked
        ${service.name}
    </p>

    <p>
        Date:
        ${new Date(date)
        .toLocaleDateString()}
    </p>

    <p>
        Please login to your dashboard.
    </p>
    `
    );
}

res.json({

message:"Appointment booked",

booking

});



}

catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}


};

exports.getProviderBookings = async(req,res)=>{


try{


const provider =

await prisma.provider.findUnique({

where:{

userId:req.user.id

}

});

if (!provider) {
  return res.status(404).json({
    message: "Provider not found"
  });
}


const bookings =

await prisma.booking.findMany({

where:{

providerId:provider.id

},

include:{
  patient:{
    include:{
      user:true
    }
  },
  service:true
}

});


res.json(bookings);



}

catch(error){

console.log(error);

res.status(500).json({
  message:error.message
});

}


};


exports.updateBookingStatus = async(req,res)=>{


try{


const {id}=req.params;


const {status}=req.body;

const allowedStatuses = [
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED"
];

if(
  !allowedStatuses.includes(status)
){
  return res.status(400).json({
    message:"Invalid status"
  });
}

const booking =
await prisma.booking.update({

  where: {
    id
  },

  data: {
    status
  },

  include: {
    patient: {
      include: {
        user: true
      }
    },

    provider: true,

    service: true
  }
});


if (
  status === "CANCELLED"
) {

  await sendEmail(
    booking.patient.user.email,

    "Appointment Request Rejected",

    `
    <h2>
      Appointment Request Rejected
    </h2>

    <p>
      Unfortunately your appointment request
      could not be accepted.
    </p>

    <p>
      Please choose another slot.
    </p>
    `
  );
}

if(status === "CONFIRMED"){

  await prisma.notification.create({
        data:{
        userId:
        booking.patient.user.id,

        title:
        "Appointment Confirmed",

        message:
            `Your appointment with
            ${booking.provider.name}
            has been confirmed.`
        }
   });

}

if(status === "CONFIRMED"){

  await sendEmail(

    booking.patient.user.email,

    "Appointment Confirmed",

    `
    <h2>
      Appointment Confirmed
    </h2>

    <p>
      Your appointment with
      ${booking.provider.name}
      has been confirmed.
    </p>

    <p>
      Service:
      ${booking.service.name}
    </p>

    <p>
      Date:
      ${new Date(
        booking.date
      ).toLocaleDateString()}
    </p>

    <p>
        <strong>Status:</strong>
        Appointment Confirmed
    </p>

    <br>

    <p>
        Thank you,
        <br>
        Healthcare Platform
    </p>
    `
    );

}

if(status === "CANCELLED"){

  await prisma.notification.create({
        data:{
        userId:
        booking.patient.user.id,

        title:
        "Appointment Rejected",

        message:
            `Your appointment request with
            ${booking.provider.name}
            has been rejected.`
        }
    });

}

if (
  status === "COMPLETED"
) {

  await prisma.notification.create({

    data: {

      userId:
      booking.patient.user.id,

      title:
      "Appointment Completed",

      message:
         `Your appointment with
        ${booking.provider.name}
         has been marked as completed.`
    }
  });
}

res.json({

message:"Booking updated",

booking

});


}


catch(error){

console.log(error);

res.status(500).json({
  message:error.message
});

}


};

exports.getAvailableSlots = async(req,res)=>{


try{


const {providerId}=req.params;

const {date}=req.query;



const selectedDate =
new Date(date);



const dayNames = [

"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"

];


const dayOfWeek =
dayNames[selectedDate.getDay()];



const availability =
await prisma.providerAvailability.findFirst({

where:{

providerId,

dayOfWeek,

active:true

}

});



if(!availability){

return res.json([]);

}




let slots=[];



let start =
new Date(`${date}T${availability.startTime}`);


let end =
new Date(`${date}T${availability.endTime}`);




while(start < end){


const time =
start.toTimeString().slice(0,5);



const existing =
await prisma.booking.findFirst({

where:{

providerId,

date:start,

status:{
not:"CANCELLED"
}

}

});



if(!existing){


slots.push({

time,

datetime:start

});


}



start = new Date(

start.getTime()
+
availability.slotDuration*60000

);


}




res.json(slots);



}

catch(error){


console.log(error);


res.status(500).json({

message:"Unable to load slots"

});


}


}

exports.getPatientBookings = async(req,res)=>{

try{

const userId=req.user.id;


const patient =
await prisma.patientProfile.findUnique({

where:{
userId
}

});


const bookings =
await prisma.booking.findMany({

where:{
patientId:patient.id
},


include:{
  provider:true,
  service:true
},


orderBy:{
date:"desc"
}


});


res.json(bookings);


}
catch(error){

console.log(error);

res.status(500).json({

message:"Unable to fetch bookings"

});


}

}
