import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Review() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading , setLoading] = useState(true)
  const [quesSoln, setQuesSoln] = useState([]);
  const { id } = useParams();

  const handleSolutionSubmission = async () => {
    try {
      setQuesSoln([...quesSoln, { name, comment }]);
      const resp = await axios.post("/api/solutionPost", {
        name,
        comment,
        id,
      });

      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSolution = async () => {
      try {
        const solnColl = await axios.get(`/api/getSolution/${id}`);
        console.log(solnColl.data);
        setQuesSoln(solnColl.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    getSolution();
  }, []);
  if(loading){
    return <h1>Loading...</h1>
  }

  const solnColl = quesSoln.map((data) => {
    return (
      <div className="bg-gray-200  p-3 rounded-md mt-2" key={data.id}>
        <h1 className="text-2xl text-gray-700">{data.name}</h1>
        <p className="text-gray-600">{data.comment}</p>
      </div>
    );
  });

  return (
    <section className="flex flex-col flex-1 p-12">
      <h1 className="text-2xl text-gray-600">Question</h1>
      {/* this is for the question segment */}
      <div className="bg-gray-200 p-3 rounded-md">
        <h1 className="text-2xl text-gray-700">
          What is the best way to learn React?
        </h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.
        </p>
      </div>

      <button className="self-end bg-blue-600 p-1  text-white mt-2 rounded">
        Resolve
      </button>

      <h1 className="text-2xl text-gray-700">Response</h1>

      <div className="max-h-100">{solnColl}</div>

      <div className="flex flex-col ">
        <h1 className="text-xl text-gray-700">Add Responses</h1>

        <input
          type="text"
          value={name}
          className="outline-none mt-2 w-1/3 border border-gray rounded p-2"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />

        <textarea
          value={comment}
          className="outline-none mt-1 border border-gray rounded p-5"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter Comment"
        />
      </div>
      <button
        className="self-end bg-blue-600 p-2  text-white mt-4 rounded"
        onClick={handleSolutionSubmission}
      >
        Submit
      </button>
    </section>
  );
}
