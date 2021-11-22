import React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Pokemon from "pages/Pokemon";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            <div>
              Main Page, goto <Link to="/pokemon">Pokemon</Link>
            </div>
          }
        />
        <Route path="/pokemon/*" element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
