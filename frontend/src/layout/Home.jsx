import React from "react";
import { Outlet } from "react-router-dom";
import QuestionComp from "../component/QuestionComp";
import Header from "../component/Header";
export default function Home() {
  return (
    <>
      <Header />
      <div className="flex">
        <QuestionComp />
        <Outlet />
      </div>
    </>
  );
}
