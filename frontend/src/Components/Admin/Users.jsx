import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}api/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          setErrorMessage(data.message || "Failed to fetch users.");
        }
      } catch (error) {
        setErrorMessage("Error fetching users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center font-bold">Users</h2>
      <p className="text-center">Manage registered users.</p>

      {errorMessage && (
        <div className="mb-6 p-4 text-center rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-700 text-center font-medium text-center">
            {errorMessage}
          </p>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Total Users: {users.length}</h3>
      </div>

      <div className="container my-5 table-responsive">
        <h2 className="mb-4">User Details</h2>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-dark h4">
                  No Users Available
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td className=" text-dark h6">{user.username}</td>
                  <td className="text-dark h6">{user.email}</td>
                  <td className=" text-dark h6">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
