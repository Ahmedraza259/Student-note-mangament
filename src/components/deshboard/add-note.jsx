import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldErrorMessage from "../others/error";

const AddNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ title: [], description: [] });
  const accessToken = "Bearer " + localStorage.getItem("accessToken");
  const handleAddNote = async () => {
    try {
      const apiUrl = process.env.REACT_APP_URL;
      const response = await fetch(`${apiUrl}note/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data?.message);
        navigate("/dashboard");
      } else {
        setErrors({
          title: data?.message || [],
          description: data?.message || [],
        });
      }
    } catch (error) {
      alert("error while creating note", error);
    }
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => {setTitle(e.target.value)
            setErrors()
            }}
          />
          <FieldErrorMessage errors={errors?.title} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors();
            }}
          />
          <FieldErrorMessage errors={errors?.description} />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </>
  );
};

export default AddNote;
