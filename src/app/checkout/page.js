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

  
const handleStatusChange = async (orderId, newStatus) => {
  try {
    console.log("Sending:", { orderId, status: newStatus });
    const res = await fetch("/api/updateOrders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ orderId, status: newStatus})
    });

    if (!res.ok) {
      alert("Failed to update status");
      return;
    }

    alert("Status updated successfully!");
  } catch (e) {
    alert("Error updating order");
  }
};


const handleQtyChange = async (orderId, newQty) => {
    try {
      console.log("Sending:", { orderId, qty: newQty });
      const res = await fetch("/api/updateOrders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderId, qty: newQty })
      });

      if (!res.ok) {
        alert("Failed to update quantity");
        return;
      }

      alert("Quantity updated successfully!");
    } catch (e) {
      alert("Error updating quantity");
    }
  };
  // Create an array of order IDs to send to the completeOrder function
  const orderList = data.orders?.map(item => item._id) || [];

  const completeOrder = async (orderList) => {
    try {
      console.log("Sending:", { orderList });
      const res = await fetch("/api/completeOrders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderList })
      });

      if (!res.ok) {
        alert("Failed to complete order");
        return;
      }

      alert("Order completed successfully!");
    } catch (e) {
      alert("Error completing order");
    }
  }
  
  const invTotal = data.orders?.reduce((total, item) => {
    const itemTotal = item.bev && item.qty ? item.bev.price * item.qty : 0;
    return total + itemTotal;
  }, 0);





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
                {/* <th className="px-4 py-2">Order Date</th> */}
                <th className="px-4 py-2">Status</th>
                {/* <th className="px-4 py-2">Action</th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">

              {/* // Map through orders and display them in the table */}
              {data.orders?.map((item) => (
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
                    <input
                      type="number"
                      min="1"
                      value={item.qty ?? "No qty"}
                      onChange={(e) => {
                        console.log("Updating:", item._id, e.target.value);
                        handleQtyChange(item._id, parseInt(e.target.value));
                      }}
                    />  
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
                <select
                onChange={(e) => {
                  console.log("Updating status:", item._id, e.target.value);
                  handleStatusChange(item._id, e.target.value);
                }}
                  id={`status${item._id}`}
                  defaultValue={item.status ?? "Pending"}
                  disabled={!data.currentUser?.isAdmin}
                  className={`px-2 py-1 border rounded-md ${
                    !data.currentUser?.isAdmin
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {!data.currentUser?.isAdmin ? (
                     <>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Cancelled">Cancel</option>
                    </>
                  ) : (
                    <>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </>
                  )}
                </select>
              </td>

                    
                 

                </tr>
                
              )
              )}
  
            <tr className="font-semibold bg-gray-100">
              <td colSpan="5" className="px-4 py-3 text-right">
                Total
              </td>
              <td className="px-4 py-3">
                €{invTotal.toFixed(2)}
              </td>
              <td />
            </tr>

            </tbody>
                   

          </table>
                     
        </div>  
        <div className="flex justify-center gap-4 mt-6">
          <button
                      className="rounded-md bg-green-700 px-3 py-1.5 text-white text-xs font-semibold hover:bg-green-400"
                      onClick={(e) => {
                  console.log("Complete Orders:", orderList);
                  completeOrder(orderList);
                }}
                    >
                      Complete Order
                    </button>
        </div>
        
      </div>
    </div>
  );
}