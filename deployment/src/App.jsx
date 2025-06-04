
import './App.css'
import { HashRouter, Navigate, Route, Routes } from 'react-router'
import SiteLayout from './components/SiteLayout'
import Home from './components/Home'
import AquariumCalculator from './components/AquariumCalculator/AquariumCalculator'
import WaterChangeCalculator from './components/AquariumCalculator/WaterChangeCalculator/WaterChangeCalculator'

function App() {
  return <HashRouter>
    <Routes>
      <Route path='/:lang' element={<SiteLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='aquarium_calculator'>
          <Route index element={<AquariumCalculator/>} />
          <Route path='water_change_calculator' element={<WaterChangeCalculator/>} />
        </Route>
        <Route path='*' element={<Navigate to='/en' replace />} />
      </Route>
      <Route path='/' element={<Navigate to='/en' replace />} />
    </Routes>
  </HashRouter>
}

export default App
