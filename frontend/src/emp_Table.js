import React, { useEffect, useState } from "react";

function EmpTable() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.log("Error fetching.", error));
  };

  const handleDelete = (employeeId) => {
    fetch(`http://localhost:5000/delete/${employeeId}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Employee deleted.");
          fetchEmployees(); 
        } else {
          alert("Failed to delete.");
        }
      }).catch((error) => console.log("Error deleting.", error));
  };


  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Employee Table</h2>
      <table className="w-full -collapse ">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="p-2">id</th> */}
            <th className="p-2">Name</th>
            <th className="p-2">Employee ID</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Department</th>
            <th className="p-2">Joining Date</th>
            <th className="p-2">Role</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.employeeId} className="text-center">
                <td className=" p-2">{emp.name}</td>
                <td className=" p-2">{emp.employeeId}</td>
                <td className=" p-2">{emp.email}</td>
                <td className=" p-2">{emp.phone}</td>
                <td className="p-2">{emp.department}</td>
                <td className="p-2">{emp.joiningDate}</td>
                <td className="p-2">{emp.role}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(emp.employeeId)}
                    className="bg-red-500 text-white px-4 py-1 rounded "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmpTable;
