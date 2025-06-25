
import './App.css'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import SiteLayout from './components/SiteLayout'
import Home from './components/Home'
import AquariumCalculator from './components/AquariumCalculator/AquariumCalculator'
import WaterChangeCalculator from './components/AquariumCalculator/WaterChangeCalculator/WaterChangeCalculator'
import { useEffect, useState } from 'react'
import About from './components/About/About'
import UnitConverter from './components/AquariumCalculator/UnitConverter/UnitConverter'
import LoginContext from './contexts/loginContext'
import { checkLoginPath } from './paths/paths'
import Focus from './components/Focus/Focus'
import Chloramine from './components/Focus/Chloramine/Chloramine'
import WidthContext from './contexts/widthContext.js';
import WaterChangeLevelAdjustment from './components/AquariumCalculator/WaterChangeLevelAdjustment/WaterChangeLevelAdjustment.jsx'

function App() {

  function ScrollToTop() {
    const path = useLocation();
    useEffect(()=>{
      window.scrollTo({top: 0, behavior: 'smooth'});
    }, [path]);

    return null;
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [connection, setConnection] = useState(null);
  
  function checkLogin() {
    setConnection(null);
    fetch(checkLoginPath, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    }).then(res => res.json())
    .then(result => {
      if (result?.connect) {
          setLoggedIn(result?.login?? false);
          setConnection(true);
      }
      else {
          setLoggedIn(false);
          setConnection(false);
      }
    }).catch(err => {
      setConnection(false);
    })
  }

  useEffect(()=>{
      checkLogin();
  }, []);

  const [screenW, setScreenW] = useState(window.innerWidth);
  useEffect(()=>{
    const resize = () => {setScreenW(window.innerWidth)}
    
    window.addEventListener('resize', resize);
    return ()=>{
        window.removeEventListener('resize', resize);
    };
  });

  return <HashRouter>
    <ScrollToTop />
    <LoginContext.Provider value={[loggedIn, setLoggedIn, checkLogin, connection]}>
    <WidthContext.Provider value={screenW} >
      <Routes>
        <Route path='/:lang' element={<SiteLayout />}>
          <Route index element={<Home/>}></Route>
          <Route path="focus">
            <Route index element={<Focus />} />
            <Route path="chloramine" element={<Chloramine />} />
          </Route>

          <Route path='aquarium_calculator'>
            <Route index element={<AquariumCalculator/>} />
            <Route path='water_change_calculator' element={<WaterChangeCalculator/>} />
            <Route path='unit_converter' element={<UnitConverter />} />
            <Route path='water_change_level_adjustment' element={<WaterChangeLevelAdjustment />} />
          </Route>

          <Route path='about' element={<About />} />
          <Route path='*' element={<Navigate to='/en' replace />} />
        </Route>
        <Route path='/' element={<Navigate to='/en' replace />} />
      </Routes>
    </WidthContext.Provider>
    </LoginContext.Provider>
  </HashRouter>
}

export default App
