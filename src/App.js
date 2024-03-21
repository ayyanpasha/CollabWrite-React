import TextEditor from './pages/TextEditor/TextEditor';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home/Home'
import About from './pages/About/About';
import Document from './pages/Documents';
import Navbar from './layouts/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Alert from './components/Alert';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/slices/authentication';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the getUser action when the component mounts
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path="/document" element={<Document />} />
          <Route exact path="/document/:id" element={<TextEditor />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
