import React from "react";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import Home from "./layout/Home";
import SolutionComp from "./component/SolutionComp";
import Review from "./component/Review";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<SolutionComp />} />
          <Route path="/question/:id" element={<Review/>}/>
        </Route>
      </Routes>
    </>
  );
}
