import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
            <button onClick={() => onEdit(u)}>Edit</button>
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
