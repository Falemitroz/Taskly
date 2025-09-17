import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Dashboard, Profile } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
