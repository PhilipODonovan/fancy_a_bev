'use client';
import * as React from 'react';
import Image from 'next/image';





import { useState, useEffect } from 'react'






export default function Page() {








  const [data, setData] = useState(null)
 
 
  useEffect(() => {
    fetch('api/getOrders')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })



  }, [])
 

  if (!data) return <p>No data</p>






  
  return (
 
  
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          

                <div style={{fontSize: '40px'}} > Checkout</div>
        <div>
      {
        data.map((item, i) => (
          <div style={{padding: '20px'}} key={i} className="flex-grid col-span-4 gap-4" >
            <div>
            Unique ID: {item._id}
            </div>
            <div className="flex col-span-4">
             
            {item.user ? `User ID: ${item.user.email}` : "No user ID"}
            <br></br>
            - 
            {item.bev ? `${item.bev.make} ${item.bev.model}` : "No bev ID"}
            <br></br>
            {item.qty ? `Quantity: ${item.qty}` : "No quantity"}
            </div>
            <div>
            - €
            {item.bev.price}
            </div>
            {/* <div className='col-span-2'>
            <Image src={`/${item.bev.image}`} width={200} height={100} className="h-auto w-auto" alt="car image" loading="eager"  />
            </div>
            <button className="flex justify-center rounded-md bg-indigo-500 px-3 py-1.5
             text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={() => putInCart(item.make)}> Add to cart </button> */}
          </div>
        ))
      }
    </div>
      
</div>  
    );
}



