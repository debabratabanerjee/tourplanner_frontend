import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TourPlans from './components/TourPlans';
import TourPlanDetail from './components/TourPlanDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TourPlans />} />
        <Route path="/plan/:planId" element={<TourPlanDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
