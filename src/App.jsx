import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import React from 'react';
// import {BrowserRouter} from "react-router-dom";
// Pages;
import Home from './pages/Home';
import Gallary from './pages/Gallary.jsx';
import Contact from './pages/Contact.jsx';
import Cards from './pages/WWDCards.jsx';

//Navbar Footer;
import Navbar from './component/ui/Navbar';
import Footer from './pages/Footer';
import Careers from './pages/Careers.jsx';
import MainAchieve from './pages/MainAchieve.jsx';
import Profile from './pages/Profile.jsx';
import NewsBlogs from './pages/NewsBlogs.jsx';

// Admin Pages;
import AuthLayout from './_auth/AuthLayout.jsx';
import SigninForm from './_auth/forms/SigninForm';
import { useUserContext } from './context/AuthContext';

// Navbar and Footer;
import SideNavbar from './Components/SideNavbar';
import TopNavbar from './Components/TopNavrbar';
import Dashboard from './_root/pages/Dashboard';

//DashBoard;
import AdminHome from './_root/pages/AdminHome';
import Services from './_root/pages/Services.jsx';
import SubServices from './_root/pages/SubServices.jsx';
import Career from './_root/pages/Career.jsx';
import Contact1 from './_root/pages/Contact.jsx';
import Employee1 from './_root/pages/Employee.jsx';
import Meetings from './_root/pages/Meetings.jsx';
import PhotoGallery from './_root/pages/PhotoGallery.jsx';
import { useGetAdminProfile } from './lib/react-query/queries.js';
import TaxServices from './pages/services/TaxServices.jsx';
import CompForandReg from './pages/services/CompForandReg.jsx';
import AuditService from './pages/services/AuditService.jsx';
import DrafandAgree from './pages/services/DrafandAgree.jsx';
import ApeeLiti from './pages/services/ApeeLiti.jsx';
import Advisory from './pages/services/Advisory.jsx';
import Other from './pages/services/Other.jsx';
import Reviews from './pages/Reviews.jsx';
import IncomeTax from './pages/Blogs/IncomeTax.jsx';
import Gst from './pages/Blogs/Gst.jsx';
import Tds from './pages/Blogs/Tds.jsx';
import PartnershipRg from './pages/Blogs/PartnershipRg.jsx';
import CompF from './pages/Blogs/CompF.jsx';
import LLP from './pages/Blogs/LLP.jsx';
import Statutory from './pages/Blogs/Statutory.jsx'
import Bussiness_formation from './pages/Blogs/Bussiness_formation.jsx';
import NonProfitCom from './pages/Blogs/NonProfitCom.jsx';
import Taxaudit from './pages/Blogs/Taxaudit.jsx';
import Compliance from './pages/Blogs/ComplianceAudit.jsx';
import Internal from './pages/Blogs/InternalAudit.jsx';
import Charitable from './pages/Blogs/Charitable.jsx';
import Association from './pages/Blogs/Association.jsx';
import Shop_act from './pages/Blogs/Shop_act.jsx';
import Appeals from './pages/Blogs/Appeals.jsx';
import LoanFund from './pages/Blogs/LoanFund.jsx';
import Prop from './pages/Blogs/Prop.jsx';
import Litigation from './pages/Blogs/Litigation.jsx';
import Bussinessd from './pages/Blogs/Busdis.jsx';
import Drafting from './pages/Blogs/Drafting.jsx';
import Partner from './pages/Blogs/Partner.jsx';
import Aoa from "./pages/Blogs/Aoa.jsx"
import Moa from './pages/Blogs/Moa.jsx';
import Shareholder from './pages/Blogs/Shareholder.jsx';
import Debenture from './pages/Blogs/Debenture.jsx';
import Hirepurchase from './pages/Blogs/Hirepurchase.jsx';
import Leasedeed from './pages/Blogs/Leasedeed.jsx';
import Contract from './pages/Blogs/ContractAgree.jsx';
import InvesAdv from './pages/Blogs/InvesAdv.jsx';
import Msme from './pages/Blogs/Msme.jsx';
import Fixed from './pages/Blogs/FixedD.jsx';
import Subsidy from './pages/Blogs/Subsidy.jsx';
import FinFraud from './pages/Blogs/FinFraud.jsx';
import Economic from './pages/Blogs/Economic.jsx';
import Insurence from './pages/Blogs/LGInsurence.jsx';
import Startup from './pages/Blogs/StartupRegistration.jsx';
import ImportExport from './pages/Blogs/ImportExport.jsx';
import InvestmentAd from './pages/Blogs/InvestmentAd.jsx';
import PropertyAdvice from './pages/Blogs/PropertyAdvice.jsx';

function App() {
  const { isAuthenticated, isLoading } = useUserContext();
  const [isAdminAuthenticated, isSetAuthenticated] = useState(false);
  useGetAdminProfile()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if(!isLoading && isAuthenticated ) 
          {
            isSetAuthenticated(true)
          }
          else if(!isAuthenticated && !isLoading)
          {
            isSetAuthenticated(false)
          }
      } catch (error) {
        isSetAuthenticated(false)
        console.error(error);
      } 
    };
    checkAuth()
  }, [isAuthenticated,isLoading]);

  return (
    <>
      {isAdminAuthenticated  ? (
          <>
          <TopNavbar />
          <div className='main-container1'>
            <SideNavbar />
            <div className='content1'>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/adminHome' element={<AdminHome />} />
                <Route path='/adminservices' element={<Services />} />
                <Route path='/career' element={<Career />} />
                <Route path='/Photogallery' element={<PhotoGallery />} />
                <Route path='/meetings' element={<Meetings />} />
                <Route path='/contact' element={<Contact1 />} />
                <Route path='/employee' element={<Employee1 />} />
                <Route path='/subservices/:serviceId' element={<SubServices />} />
              </Routes>
            </div>
          </div>
        </>
       
      ) : (
     <>
          <Navbar />
          <div className='content2'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/gallary' element={<Gallary />} />
              <Route path='/cards' element={<Cards />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/career' element={<Careers />} />
              <Route path='/mainachieve' element={<MainAchieve />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/reviews' element={<Reviews />} />
              <Route path='/newsblogs' element={<NewsBlogs />} />
              <Route path='/services/taxservices' element={<TaxServices />} />
              <Route path='/services/comforReg' element={<CompForandReg />} />
              <Route path='/services/auditServices' element={<AuditService />} />
              <Route path='/services/drafAgree' element={<DrafandAgree />} />
              <Route path='/services/appLiti' element={<ApeeLiti />} />
              <Route path='/services/advi' element={<Advisory />} />
              <Route path='/services/other' element={<Other />} />

              <Route path='/services/taxservices/incometax' element={<IncomeTax />} />
              <Route path='/services/taxservices/gst' element={<Gst />} />
              <Route path='/services/taxservices/tds' element={<Tds />} />

              <Route path='/services/comforReg/comFor' element={<CompF />} />
              <Route path='/services/comforReg/parReg' element={<PartnershipRg />} />
              <Route path='/services/comforReg/llp' element={<LLP />} />
              <Route path='/services/comforReg/busReg' element={<Bussiness_formation />} />
              <Route path='/services/comforReg/npc' element={<NonProfitCom />} />
              <Route path='/services/comforReg/chari' element={<Charitable />} />
              <Route path='/services/comforReg/asso' element={<Association />} />
              <Route path='/services/comforReg/shopAct' element={<Shop_act />} />
              <Route path='/services/comforReg/msme' element={<Msme />} />

              <Route path='/services/auditServices/statu' element={<Statutory />} />
              <Route path='/services/auditServices/taxaudit' element={<Taxaudit />} />
              <Route path='/services/auditServices/complience' element={<Compliance />} />
              <Route path='/services/auditServices/internal' element={<Internal />} />

              <Route path='/services/drafAgree/apeeals' element={<Appeals />} />
              <Route path='/services/drafAgree/litiga' element={<Litigation />} />
              <Route path='/services/drafAgree/businDisp' element={<Bussinessd />} />

              <Route path='/services/advi/loanFund' element={<LoanFund />} />
              <Route path='/services/advi/prop' element={<PropertyAdvice />} />
              <Route path='/services/advi/invest' element={<InvestmentAd />} />
              <Route path='/services/advi/fdadv' element={<Fixed />} />
              <Route path='/services/advi/bondadv' element={<Appeals />} />
              <Route path='/services/advi/subsidy' element={<Subsidy />} />
              <Route path='/services/advi/finanfraud' element={<FinFraud />} />
              <Route path='/services/advi/ecoOffen' element={<Economic />} />
              <Route path='/services/advi/lifeGen' element={<Insurence />} />
              <Route path='/services/advi/startUpIndia' element={<Startup />} />
              <Route path='/services/advi/impExp' element={<ImportExport />} />

              <Route path='/services/appLiti/draft' element={<Drafting />} />
              <Route path='/services/appLiti/partnerdeed' element={<Partner />} />
              <Route path='/services/appLiti/aoa' element={<Aoa />} />
              <Route path='/services/appLiti/moa' element={<Moa />} />
              <Route path='/services/appLiti/shareagree' element={<Shareholder />} />
              <Route path='/services/appLiti/debenagree' element={<Debenture />} />
              <Route path='/services/appLiti/hire' element={<Hirepurchase />} />
              <Route path='/services/appLiti/lease' element={<Leasedeed />} />
              <Route path='/services/appLiti/contagree' element={<Contract />} />

              

              <Route element={<AuthLayout />}>
                <Route path='/sign-in' element={<SigninForm />} />
              </Route>

            </Routes>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;