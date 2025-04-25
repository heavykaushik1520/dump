import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";

const UserForm = ({ userToEdit, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
    }
  }, [userToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userToEdit) {
      await axios.put(`/${userToEdit.id}`, { name, email });
    } else {
      await axios.post("/", { name, email });
    }
    setName("");
    setEmail("");
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{userToEdit ? "Edit User" : "Add User"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">{userToEdit ? "Update" : "Create"}</button>
    </form>
  );
};

export default UserForm;
