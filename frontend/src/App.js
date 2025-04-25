import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserDetails from "./components/UserDetails";
import { useState } from "react";

function App() {
  const [userToEdit, setUserToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (user) => setUserToEdit(user);
  const handleSave = () => {
    setUserToEdit(null);
    setRefresh(!refresh);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <UserForm userToEdit={userToEdit} onSave={handleSave} />
              <UserList onEdit={handleEdit} key={refresh} />
            </>
          }
        />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
