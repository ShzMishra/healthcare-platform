const express=require("express");
const cors=require("cors");
require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");

const authRoutes=require("./routes/authRoutes");
const providerRoutes = require("./routes/providerRoutes");
const providerProfileRoutes = require("./routes/providerProfileRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const marketRoutes = require("./routes/marketRoutes");
const searchRoutes = require("./routes/searchRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const app=express();



app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

app.use("/api/admin",adminRoutes);

app.use("/api/auth",authRoutes);

app.use("/api/providers",providerRoutes);

app.use("/api/provider",providerProfileRoutes);
app.use("/api/services",serviceRoutes);
app.use("/api/market",marketRoutes);
app.use("/api/search",searchRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/provider/availability",availabilityRoutes);
// app.use("/api/provider",require("./routes/providerRoutes"));
app.use("/api/notifications",notificationRoutes);


app.get("/",(req,res)=>{

res.json({

message:"Healthcare API running"

});

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});

