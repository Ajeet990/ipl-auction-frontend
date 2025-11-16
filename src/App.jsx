import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CurrentPlayer } from "./Components/Client/CurrentPlayer";
import AdminPage from "./Pages/Admin/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client routes  */}
        <Route path="/" element={<CurrentPlayer/>} />
        <Route path="/about" element={<h1>About Page</h1>} />

        {/* Admin routes  */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Handle all other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
