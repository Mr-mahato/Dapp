import React, { useState } from "react";
import axios from "axios";
import { useData } from "../context/dataContext";
export default function SolutionComp() {
  const [question, setQuestion] = useState("");
  const [questionBrief, setQuestionBrief] = useState("");
  const { updateQuestion } = useData();
  const handleSubmit = () => {
    // if (question == "" || questionBrief == "") {
    //   alert("Please fill the form");

    //   return;
    // }
    // axios
    //   .post("/api/getQuestion", {
    //     question: question,
    //     questionBrief: questionBrief,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setQuestion("");
    //     setQuestionBrief("")
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    updateQuestion({
      question: question,
      questionBrief: questionBrief,
    });
    setQuestion("");
    setQuestionBrief("");
  };
  return (
    <section className="solution flex flex-col flex-1 p-14 ">
      <h1 className="text-2xl">Welcome to Discussion Portal !</h1>
      <p>Enter a subject and question to get started</p>

      {/* question input box */}
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="outline-none  w-1/2 mt-10 border border-gray  p-2  rounded"
        placeholder="Enter Subject"
      />
      {/* question brief input box */}
      <textarea
        value={questionBrief}
        onChange={(e) => setQuestionBrief(e.target.value)}
        className="outline-none mt-10 border border-gray rounded p-5"
        placeholder="Brief your doubt"
        rows={5}
        cols={7}
      />

      <button
        className="self-end bg-blue-600 p-2  text-white mt-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </section>
  );
}
