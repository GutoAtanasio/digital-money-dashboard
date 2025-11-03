import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';

export default function App(){
  return (
    <Router>
      <div style={{padding:20}}>
        <nav style={{marginBottom:20}}>
          <Link to="/dashboard" style={{marginRight:10}}>Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  )
}
