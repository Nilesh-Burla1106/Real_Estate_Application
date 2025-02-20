import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import TelecallerDashboard from './TelecallerDashboard';
import AdvisorDashboard from './AdvisorDashboard';
import AccountantDashboard from './AccountantDashboard';
import ManageCustomers from './ManageCustomers';
import ManageCalls from './ManageCalls';
import ScheduleSiteVisits from './ScheduleSiteVisits';
import ManageClientPreferences from './ManageClientPreferences';
import Managageexpences from './Managageexpenses';
import ManageListings from './ManageListings';
import ViewUsers from './ViewUsers';
import ViewReports from './ViewReports';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Settings from './Settings';
import Profile from "./Profile";
import Reminders from './Reminders';
import CallComponent from './CallComponent';
import Projects from './Projects'; 
import UploadPage from './UploadPage';
import FormTableApp from './FormTableApp';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/manager-dashboard' element={<ManagerDashboard />} />
        <Route path='/telecaller-dashboard' element={<TelecallerDashboard />} />
        <Route path='/advisor-dashboard' element={<AdvisorDashboard />} />
        <Route path='/accountant-dashboard' element={<AccountantDashboard/>}/>
        <Route path="/manage-customers" element={<ManageCustomers />} />
        <Route path="/manage-calls" element={<ManageCalls />} />
        <Route path="/schedule-site-visits" element={<ScheduleSiteVisits />} />
        <Route path="/manage-client-preferences" element={<ManageClientPreferences />} />
        <Route path="/manage-expenses" element={<Managageexpences />} />
        <Route path="/manage-listings" element={<ManageListings />} />
        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/view-reports" element={<ViewReports />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path='/call-component' element={<CallComponent />}/>
        <Route path="/projects" element={<Projects />} />
        <Route path="/upload-page" element={<UploadPage />} />
        <Route path="/formtableapp" element={<FormTableApp />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
