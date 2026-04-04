'use client';

import { useState, useEffect } from "react";
import Image from "next/image";


export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/getUsers")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>No data</p>;

  return (
    <div className="flex min-h-full flex-col px-6 py-12 lg:px-8">
      <h1 className="text-4xl font-semibold mb-8">Users</h1>

      <div className="p-6">
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-blue-500 text-white text-left">
              <tr>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {item._id ?? "No user"}
                  </td>

                  <td className="px-4 py-3">
                    {item.email
                      ? `${item.email}`
                      : "No email"}
                  </td>
                  
                 
                    
                  <td className="px-4 py-3">
                    <select
                      id={`role${item._id}`}
                      defaultValue={item.isAdmin ? "Manager" : "Customer"}  >
                        <option value="Customer">Customer</option>
                        <option value="Manager">Manager</option>
                      </select>
                    
                  </td>





                  <td className="px-4 py-3">
                    <button
                      className="rounded-md bg-blue-700 px-3 py-1.5 text-white text-xs font-semibold hover:bg-blue-600"
                      onClick={() => alert(`User ID: ${item._id}`)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}