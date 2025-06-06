
import './App.css'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import SiteLayout from './components/SiteLayout'
import Home from './components/Home'
import AquariumCalculator from './components/AquariumCalculator/AquariumCalculator'
import WaterChangeCalculator from './components/AquariumCalculator/WaterChangeCalculator/WaterChangeCalculator'
import { useEffect } from 'react'
import About from './components/About/About'

function App() {

  function ScrollToTop() {
    const path = useLocation();
    useEffect(()=>{
      window.scrollTo({top: 0, behavior: 'smooth'});
    }, [path]);

    return null;
  }

  return <HashRouter>
    <ScrollToTop />
    <Routes>
      <Route path='/:lang' element={<SiteLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='aquarium_calculator'>
          <Route index element={<AquariumCalculator/>} />
          <Route path='water_change_calculator' element={<WaterChangeCalculator/>} />
        </Route>
        <Route path='about' element={<About />} />
        <Route path='*' element={<Navigate to='/en' replace />} />
      </Route>
      <Route path='/' element={<Navigate to='/en' replace />} />
    </Routes>
  </HashRouter>
}

export default App
