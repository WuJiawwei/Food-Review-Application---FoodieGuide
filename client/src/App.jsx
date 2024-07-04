import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UpdatePage from "./routes/UpdatePage";
import Home from "./routes/Home";
import StallDetailPage from "./routes/StallDetailPage";


const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/stalls/:id/update" element={<UpdatePage />} />
          <Route exact path="/stalls/:id" element={<StallDetailPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
