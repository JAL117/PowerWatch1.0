import React from 'react';
import NavbarHome from '../Components/Home/NavbarHome';
import Header from '../Components/Home/Header';
import Features from '../Components/Home/Features';
import PowerWatch from '../Components/Home/PowerWatch';
import Animaciones from '../Components/common/animaciones';
import Footer from '../Components/Home/Footer';

const Home = () => {
  return (
    <div style={{margin:"0"}}>

       <Animaciones>
      <NavbarHome />
      <Header />
      <Features />
      <PowerWatch />
      <Footer/>
    </Animaciones>
    </div>
   
  );
}

export default Home;
