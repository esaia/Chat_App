import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Authentcontext } from "./Contexts/Authcontext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  const currentuser = useContext(Authentcontext);

  return (
    <Routes>
      <Route path='/'>
        {currentuser ? (
          <Route index element={<Home />} />
        ) : (
          <>
            <Route path='/' element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
