import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './lib/AppContext';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Setup from './pages/Setup';
import Participants from './pages/Participants';
import Mentors from './pages/Mentors';
import RealityCheck from './pages/RealityCheck';
import Discovery from './pages/Discovery';
import Prioritization from './pages/Prioritization';
import Canvas from './pages/Canvas';
import Actions from './pages/Actions';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';

const basePath = import.meta.env.VITE_BASE_PATH || '/';

function App() {
  return (
    <BrowserRouter basename={basePath}>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="setup" element={<Setup />} />
            <Route path="participants" element={<Participants />} />
            <Route path="mentors" element={<Mentors />} />
            <Route path="reality-check" element={<RealityCheck />} />
            <Route path="discovery" element={<Discovery />} />
            <Route path="prioritization" element={<Prioritization />} />
            <Route path="canvas" element={<Canvas />} />
            <Route path="actions" element={<Actions />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
