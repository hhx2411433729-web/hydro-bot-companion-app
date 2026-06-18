import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import DeviceDetails from './pages/DeviceDetails'
import Encyclopedia from './pages/Encyclopedia'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/device/:id" element={<DeviceDetails />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
