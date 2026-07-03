const express = require("express");

const router = express.Router();

const auth =
require("../middleware/authMiddleware");


const {

createBooking,
getPatientBookings,
getProviderBookings,
getAvailableSlots,
updateBookingStatus

} = require("../controllers/bookingController");





// CREATE BOOKING
router.post(
"/create",
auth,
createBooking
);




// PATIENT BOOKINGS
router.get(
"/patient",
auth,
getPatientBookings
);




// PROVIDER BOOKINGS
router.get(
"/provider",
auth,
getProviderBookings
);




// AVAILABLE SLOTS
router.get(
"/available-slots",
auth,
getAvailableSlots
);




// PROVIDER SLOT CHECK
router.get(
"/slots/:providerId",
auth,
getAvailableSlots
);




// PROVIDER CONFIRM / CANCEL
router.put(
"/:id/status",
auth,
updateBookingStatus
);



module.exports = router;