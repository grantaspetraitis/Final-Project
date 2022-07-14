import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AppContextProvider from './Context';
import AddQuestion from './components/AddQuestion';
import Profile from './pages/Profile';
import QuestionPage from './pages/QuestionPage';

function App() {
  return (
    <>
      <AppContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <Navbar />
          <Routes>
            <Route path='/questions' element={<Home />} />
            <Route path='/addquestion' element={<AddQuestion />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/questions/:id' element={<QuestionPage />} />
            <Route path='/questions/:id/answers' element={<QuestionPage />} />
          </Routes>
        </Router>
      </AppContextProvider>
    </>
  );
}

export default App;
