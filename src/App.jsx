import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import UploadImages from './pages/UploadImages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<UploadImages />} />
      </Routes>
    </Router>
  );
}

export default App;