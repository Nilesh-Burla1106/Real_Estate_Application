const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
require('dotenv').config();


// Import route files
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/Employee");
const callRoutes = require("./routes/callRoutes");
const customerRoutes = require("./routes/customerRoutes");
const siteVisitsRouter = require('./routes/siteVisits');
const clientPreferencesRouter = require('./routes/clientPreferences');
const expensesRoutes = require('./routes/expenses'); // Fixed the import name
const adminRoutes = require('./routes/admin');
const twilioRoutes = require('./routes/twilioRoutes'); // Renamed to avoid conflict
const reminders = require('./routes/reminders')
const accountantRoutes = require('./routes/accountant');  // Import accountant routes
const projectRoutes = require('./routes/projects'); 
const plotRoutes = require('./routes/plotRoutes');



// Initialize the express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error: ", err));

// Set up route prefixes
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/calls", callRoutes);
app.use("/api/customers", customerRoutes);
app.use('/api/site-visits', siteVisitsRouter);  // Added /api prefix to keep it consistent
app.use('/api/client-preferences', clientPreferencesRouter);
app.use('/api/expenses', expensesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/twilio', twilioRoutes); // Added Twilio route
app.use('/api/accountant', accountantRoutes);  // All accountant routes will be prefixed with /api/accountant
app.use('/api/projects', projectRoutes);
app.use('/api/reminders',reminders)
app.use('/api/plots', plotRoutes);



// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
