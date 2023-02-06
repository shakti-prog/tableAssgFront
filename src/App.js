import './App.css';
import SignUp from './pages/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn';
import QueryPage from './pages/QueryPage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<QueryPage/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
