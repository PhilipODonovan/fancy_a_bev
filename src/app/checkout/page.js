'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/getOrders")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>No data</p>;

  return (
    <div className="flex min-h-full flex-col px-6 py-12 lg:px-8">
      <h1 className="text-4xl font-semibold mb-8">Checkout</h1>

      <div className="p-6">
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-green-900 text-white text-left">
              <tr>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Car</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {item.user?.email ?? "No user"}
                  </td>

                  <td className="px-4 py-3">
                    {item.bev
                      ? `${item.bev.make} ${item.bev.model}`
                      : "No car"}
                  </td>
                  
                  <td className="px-4 py-3">
                    <Image src={item.bev.image ? `/${item.bev.image}` : "/fancyabev.png"} alt="Car Image" className="w-16 h-16 object-cover rounded-md"  width={200} height={100}/>
                  </td>
                    
                  <td className="px-4 py-3">
                    {item.qty ?? "No qty"}
                  </td>

                  <td className="px-4 py-3">
                    {item.bev
                      ? `€${item.bev.price}`
                      : "No price"}
                  </td>

                  <td className="px-4 py-3">
                    {item.bev && item.qty
                      ? `€${item.bev.price * item.qty}`
                      : "No total"}
                  </td>

                  <td className="px-4 py-3">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "No date"}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      id={`status${item._id}`}
                      defaultValue={item.status ?? "Pending"}  >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select> 
                  </td>

                  <td className="px-4 py-3">
                    <button
                      className="rounded-md bg-green-700 px-3 py-1.5 text-white text-xs font-semibold hover:bg-green-400"
                      onClick={() => alert(`Order ID: ${item._id}`)}
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