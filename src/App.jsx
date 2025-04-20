import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Closet from '@/pages/Closet';
import Upload from '@/pages/UploadImages';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/upload" element={<Upload />} />
      </Route>
    </Routes>
  );
}

export default App;
