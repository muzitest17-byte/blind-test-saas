import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Setup from './pages/Setup';
import Host from './pages/Host';
import Join from './pages/Join';
import Buzzer from './pages/Buzzer';
import Career from './pages/Career';
import CareerGame from './pages/CareerGame';
import FreePlay from './pages/FreePlay';
import QRAccess from './pages/QRAccess';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/host/:code" element={<Host />} />
        <Route path="/join/:code?" element={<Join />} />
        <Route path="/buzzer/:code" element={<Buzzer />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/play/:campaignId/:levelId" element={<CareerGame />} />
        <Route path="/free" element={<FreePlay />} />
        <Route path="/qr" element={<QRAccess />} />
      </Routes>
    </BrowserRouter>
  );
}
