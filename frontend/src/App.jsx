import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boilerplate from "./layouts/Boilerplate.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx"
import Appointment from "./pages/Appointment.jsx"
import AllDoctor from "./pages/AllDoctor.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Boilerplate />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctors" element={<AllDoctor/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
