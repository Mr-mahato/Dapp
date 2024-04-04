import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useData } from "../context/dataContext";
import axios from "axios";

export default function QuestionComp() {
  const { questionState } = useData();
  const navigate = useNavigate();
  useEffect(() => {

  },[questionState])

  const elm = questionState.map((data) => {
    return (
      <Link to={`/question/${data.id}`} key={data.id}>
        <div className="border  p-2">
          <h1 className="text-2xl text-gray-600 ">{data.question}</h1>
          <p className="text-sm">{data.questionBrief}</p>
        </div>
      </Link>
    );
  });
  return (
    <section className="questionComp flex border flex-col  flex-1 h-screen align-start ">
      <div className="flex p-3 border">
        <button
          className="p-2 bg-blue-500  rounded "
          onClick={() => navigate("/")}
        >
          New Question Form
        </button>
        <input
          type="text"
          placeholder="Search Question"
          className="outline-none border border-gray  mx-5 p-2  rounded"
        />
      </div>
      <div className="flex flex-col">
        {questionState.length === 0 ? (
          <h1 className="text-2xl text-gray-600">No Question Found</h1>
        ) : null}
        {elm}
      </div>
    </section>
  );
}
