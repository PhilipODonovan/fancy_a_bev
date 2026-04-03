'use client';
import * as React from 'react';
import Image from 'next/image';
import { generatePagination, getPaginatedData } from '@/lib/paginate';
import { useState, useEffect } from 'react'






export default function Page() {


  //
  // function for putting items into the shopping cart.
  //
  function putInCart(pname){

    console.log("putting in cart: " + pname)


    fetch("api/putInCart?pname="+pname);


 
  }





  const [data, setData] = useState([]);
  const [weather, setWeatherData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);
 
  useEffect(() => {
    fetch('api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })


  }, []);

 const paginatedData = getPaginatedData(data, currentPage, itemsPerPage);


  if (!data) return <p>No data</p>



  
return (
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

    {/* <div style={{ fontSize: "40px" }}>Dashboard</div> */}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* <div className="hidden lg:block"></div> */}

      {paginatedData.map((item, i) => (
        <div
          key={i}
          className="col-span-1 bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <div className="bg-green-900 text-white w-full text-left p-4 rounded-lg mb-3">
            {item.make} {item.model} {item.variant}
          </div>

          <div className="text-xl font-semibold mb-3">
            €{item.price}
          </div>

          <div className="mb-3">
            <Image src={'/' + item.image} width={200} height={100} className="h-auto w-auto" alt="car image" loading="eager" /> 
          </div>
          <div className="mb-3 justify-content">
              <input
                type="number"
                id={`quantity${item._id}`}
                min="1"
                max="10"
                defaultValue={1}
                className="border border-gray-300 rounded p-2 mb-3 text-center max-width-20"
              />

              <button
                className="rounded-md bg-green-700 px-3 py-1.5 text-white font-semibold hover:bg-green-400"
                onClick={() =>
                  putInCart([
                    item._id,
                    document.getElementById(`quantity${item._id}`).value,
                  ])
                }
              >
                Add to cart
              </button>
          </div>
          
    </div>
      ))}
    </div>
  
<div className="flex justify-center gap-4 mt-6">
        <button
          className={`px-4 py-2 rounded-md text-white ${
            currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-500"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <button
          className={`px-4 py-2 rounded-md text-white ${
            currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-500"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}
