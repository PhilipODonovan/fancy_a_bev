'use client';
import * as React from 'react';
import Image from 'next/image';
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link"



export default function LoginPage() {

const router = useRouter();

const [error, setError] = React.useState("");

const[form, setForm] = React.useState({
  email: "",
  pass: "",
});

const onLogin = async (e) => {
  try {
    e.preventDefault();
    const res = await axios.post(`/api/login`, 
      {
      
      email: form.email,
      password: form.pass
    },
      {withCredentials: true  });

console.log("FULL API RESPONSE:", res);
console.log("RESPONSE BODY:", res.data);


    if(res.data.success === true) {
     
      console.log("Sent email:" + form.email);
      console.log("Sent pass:" + form.pass);
      router.push("/dashboard");
    } else {
      setError(res.data.message || "Login failed. Please try again!");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed. Please try again");
  }
};



  return (
<>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/fancyabev.png"
            className="mx-auto h-10 w-auto"
            width={32}
            height={32}
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Log in to your account</h2>
        </div>
      

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onLogin} className="space-y-6">
 
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-500">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="pass" className="block text-sm/6 font-medium text-gray-500">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="pass"
                  name="pass"
                  type="password"
                  required
                  value={form.pass}
                  onChange={(e) => setForm({ ...form, pass: e.target.value })}  
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type= "submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Login
              </button>
            </div>
          </form>

        <p className="mt-6 text-center text-sm text-gray-400">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-indigo-500 hover:text-indigo-400">
                      Register here
                    </Link>
          </p>

          <p>{error}</p>

        </div>
      </div>
    </>

  );
}