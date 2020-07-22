import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "../Api/API";

const EntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.longitude = location.longitude;
      data.latitude = location.latitude;
      const createdData = await createLogEntry(data);
      console.log(createdData);
      onClose();
    } catch (error) {
      console.log("error", error);
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="entryForm">
      {error && <p className="message error">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="apiKey">Account Key</label>
        <input name="apiKey" type="password" required ref={register} />
        <label htmlFor="title">Title</label>
        <input name="title" type="text" required ref={register} />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id=""
          style={{ width: "100%", height: "100%" }}
          ref={register}
        ></textarea>
        <label htmlFor="image">Image URL</label>
        <input name="image" type="text" ref={register} />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          min="0"
          max="10"
          name="rating"
          id=""
          ref={register}
        />
        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type="date" required ref={register} />
        <button disabled={loading}>
          {loading ? "Loading..." : "Create Entry"}
        </button>
      </form>
    </div>
  );
};
export default EntryForm;
