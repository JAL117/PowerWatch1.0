import React from 'react';
import NavbarHome from '../Components/Home/NavbarHome';
import Header from '../Components/Home/Header';
import Features from '../Components/Home/Features';
import PowerWatch from '../Components/Home/PowerWatch';
import BottomSection from '../Components/Home/BottomSection';
import Animaciones from '../Components/common/animaciones';

const Home = () => {
  return (
    <div style={{margin:"0"}}>

       <Animaciones>
      <NavbarHome />
      <Header />
      <Features />
      <PowerWatch />
      <BottomSection />
    </Animaciones>
    </div>
   
  );
}

export default Home;
