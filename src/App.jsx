import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Home from './components/Home.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/Signup.jsx';
import './App.css'
import Footer from './components/Footer.jsx';
import Products from './components/Products.jsx';
import Pricing from './components/Pricing.jsx';
import BlogComponent from './components/BlogComponent.jsx';
import Profile from './components/profile.jsx';
import AboutUs from './components/AboutUs.jsx';
import PrivacyPage from './components/PrivacyPage.jsx';
import TermsAndConditions from './components/TermsAndConditions.jsx';
import ContactPage from './components/ContactPage.jsx';
function App() {
  return (
     
    <Router>
      <ResponsiveAppBar />
      
        <Routes>
          
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<BlogComponent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPage/>} />
        <Route path="/terms" element={<TermsAndConditions/>} />
         <Route path="/contact" element={<ContactPage/>} />


        
        
      </Routes>
     
     <Footer/>
    </Router>
   
  );
}

export default App;
