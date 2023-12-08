import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom"

const EditNote = () => {
    const navigate =  useNavigate()
    const { noteId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const accessToken = "Bearer " + localStorage.getItem("accessToken");
  const apiUrl = process.env.REACT_APP_URL;
  const fetchData = async()=>{
    try {
        const response = await fetch(`${apiUrl}/note/get/${noteId}`, {
          method: "GET",
          headers: {
              Authorization: accessToken,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTitle(data?.note?.title)
          setDescription(data?.note?.description)
        } else {
          alert(`${data.message}`);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Something went wrong. Please try again later.");
      }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleEditNOte = async () => {
    try {
      const response = await fetch(`${apiUrl}note/edit`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
            Authorization: accessToken,
        },
        body: JSON.stringify({ title, description,noteId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`${data.message}`);
        navigate("/dashboard");
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Title{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
          Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleEditNOte}
        >
          Save Note
        </button>
      </form>
    </>
  );
};
 export default EditNote