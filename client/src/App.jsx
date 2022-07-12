import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AppContextProvider from './Context';

function App() {
  return (
    <>
      <AppContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <Navbar />
          <Routes>
            <Route path='/questions' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      </AppContextProvider>
    </>
  );
}

export default App;
