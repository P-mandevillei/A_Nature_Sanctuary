import './App.css'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { lazy, Suspense, useEffect, useState } from 'react'

import { checkLoginPath } from './paths/paths'
import LoginContext from './contexts/loginContext'
import WidthContext from './contexts/widthContext.js';

import SiteLayout from './components/SiteLayout';
import Loading from './components/Loading.jsx'
const Home = lazy(() => import('./components/Home'));
const AquariumCalculator = lazy(() => import('./components/AquariumCalculator/AquariumCalculator'));
const WaterChangeCalculator = lazy(() => import('./components/AquariumCalculator/WaterChangeCalculator/WaterChangeCalculator'));
const About = lazy(() => import('./components/About/About'));
const UnitConverter = lazy(() => import('./components/AquariumCalculator/UnitConverter/UnitConverter'));
const Focus = lazy(() => import('./components/Focus/Focus'));
const Chloramine = lazy(() => import('./components/Focus/Chloramine/Chloramine'));
const WaterChangeLevelAdjustment = lazy(() => import('./components/AquariumCalculator/WaterChangeLevelAdjustment/WaterChangeLevelAdjustment'));

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
              
              <Route index element={<Suspense fallback={<Loading />}> <Home/> </Suspense>}></Route>
              <Route path="focus">
                <Route index element={<Suspense fallback={<Loading />}> <Focus /> </Suspense>} />
                <Route path="chloramine" element={<Suspense fallback={<Loading />}> <Chloramine /> </Suspense>} />
              </Route>

              <Route path='aquarium_calculator'>
                <Route index element={<Suspense fallback={<Loading />}> <AquariumCalculator/> </Suspense>} />
                <Route path='water_change_calculator' element={<Suspense fallback={<Loading />}> <WaterChangeCalculator/> </Suspense>} />
                <Route path='unit_converter' element={<Suspense fallback={<Loading />}> <UnitConverter /> </Suspense>} />
                <Route path='water_change_level_adjustment' element={<Suspense fallback={<Loading />}> <WaterChangeLevelAdjustment /> </Suspense>} />
              </Route>

              <Route path='about' element={<Suspense fallback={<Loading />}> <About /> </Suspense>} />
              <Route path='*' element={<Navigate to='/en' replace />} />
          
          </Route>
          <Route path='/' element={<Navigate to='/en' replace />} />
        </Routes>
    
    </WidthContext.Provider>
    </LoginContext.Provider>
  </HashRouter>
}

export default App
