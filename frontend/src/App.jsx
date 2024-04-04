import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./layout/Home";
import SolutionComp from "./component/SolutionComp";
import Review from "./component/Review";
import { DataContextProvider } from "./context/dataContext";

export default function App() {
  const [questionState, setquestionState] = useState([]);

  const updateQuestion = (data) => {
    const id = Date.now();
    data.id = id;
    setquestionState([...questionState, data]);
  };

  useEffect(() => {
    const callApi = async () => {
      try {
        axios
          .get("/api/collectQuestion")
          .then((res) => setquestionState(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    callApi();
  }, []);

  return (
    <DataContextProvider value={{ questionState, updateQuestion }}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<SolutionComp />} />
          <Route exact path="/question/:id" element={<Review />} />
        </Route>
      </Routes>
    </DataContextProvider>
  );
}
