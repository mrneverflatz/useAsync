import React from "react";

import { Routes, Route } from "react-router-dom";

import All from "./All";
import Details from "./Details";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<All />} />
        <Route path=":id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
