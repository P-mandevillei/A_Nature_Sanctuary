
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import SiteLayout from './components/SiteLayout'
import Home from './components/Home'
import AquariumCalculator from './components/AquariumCalculator/AquariumCalculator'

function App() {
  return <HashRouter>
    <Routes>
      <Route path='/' element={<SiteLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='aquarium_calculator' element={<AquariumCalculator />}> </Route>
      </Route>
    </Routes>
  </HashRouter>
}

export default App
