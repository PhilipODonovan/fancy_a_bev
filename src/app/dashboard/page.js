'use client';
import * as React from 'react';
import Image from 'next/image';

import { useState, useEffect } from 'react'






export default function Page() {


  //
  // function for putting items into the shopping cart.
  //
  function putInCart(pname){

    console.log("putting in cart: " + pname)


    fetch("api/putInCart?pname="+pname);


 
  }





  const [data, setData] = useState(null)
  const [weather, setWeatherData] = useState(0)
 
  useEffect(() => {
    fetch('api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })

      fetch('api/getWeather')
      .then((res) => res.json())
      .then((weather) => {
        setWeatherData(weather)
      })


  }, [])
 

  if (!data) return <p>No data</p>





  if (!weather) return <p>No weather</p>
  
  return (
 
  
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          

                <div style={{fontSize: '40px'}} > Dashboard</div>
        <div>
      {
        data.map((item, i) => (
          <div style={{padding: '20px'}} key={i} className="flex-grid col-span-4 gap-4" >
            <div>
            Unique ID: {item._id}
            </div>
            <div className="flex col-span-4">
            {item.make}
            - 
            {item.model}
            - 
            {item.variant}
            </div>
            <div>
            - €
            {item.price}
            </div>
            <div className='col-span-2'>
            <Image src={`/${item.image}`} width={200} height={100} className="h-auto w-auto" alt="car image" loading="eager"  />
            </div>
            <button className="flex justify-center rounded-md bg-indigo-500 px-3 py-1.5
             text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={() => putInCart(item.make)}> Add to cart </button>
          </div>
        ))
      }
    </div>
      
</div>  
    );
}



