import React, { useState } from "react";
import EmpTable from "./emp_Table";

const EmployeeForm = () => {
  const [data, setData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "",
    joiningDate: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Name is required.";
    if (!data.employeeId.trim() || data.employeeId.length > 10)
      newErrors.employeeId = "ID is required.";
    if (!data.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter a valid email.";
    if (!data.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone number must be a 10-digit.";
    if (!data.department)
      newErrors.department = "Please select a department.";
    if (!data.joiningDate || new Date(data.joiningDate) > new Date())
      newErrors.joiningDate = "no future dates.";
    if (!data.role.trim()) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     console.log(data);
  //     })
  //     handleReset();
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) alert("Employee added.");
          else alert(data.message);
        })
        .catch(() => alert("Error in submission."));
      handleReset();
    }
  };

  const handleReset = () => {
    setData({
      name: "",
      employeeId: "",
      email: "",
      phone: "",
      department: "",
      joiningDate: "",
      role: "",
    });
    setErrors({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <div className="mb-4">
          <label className="block text-black text-lg ">Name:</label>
          <input type="text" className="w-full p-3 border border-gray-300 rounded-md" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}/>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black text-lg ">Employee ID:</label>
          <input type="text" className="w-full p-3 border border-gray-300 rounded-md" value={data.employeeId} onChange={(e) => setData({ ...data, employeeId: e.target.value })}/>
          {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black text-lg ">Email:</label>
          <input type="email"className="w-full p-3 border border-gray-300 rounded-md" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black text-lg ">Phone Number:</label>
          <input type="text" className="w-full p-3 border border-gray-300 rounded-md" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}/>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black text-lg">Department:</label>
          <select className="w-full p-3 border border-gray-300 rounded-md" value={data.department} onChange={(e) => setData({ ...data, department: e.target.value })}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black text-lg">Date of Joining:</label>
          <input type="date" className="w-full p-3 border border-gray-300 rounded-md" value={data.joiningDate} onChange={(e) => setData({ ...data, joiningDate: e.target.value })}/>
          {errors.joiningDate && <p className="text-red-500 text-sm">{errors.joiningDate}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black text-lg">Role:</label>
          <input type="text" className="w-full p-3 border border-gray-300 rounded-md" value={data.role} onChange={(e) => setData({ ...data,role: e.target.value})}/>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-black text-white py-2 px-6 rounded-md">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="bg-gray-300 text-black py-2 px-6 rounded-md">
            Reset
          </button>
        </div>
      </form>
      <EmpTable />
    </div>
  );
};

export default EmployeeForm;
