'use client';

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);  // user starts as null
  const [error, setError] = useState("");

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/profile', {
        withCredentials: true
      });

      console.log("PROFILE API RESPONSE:", res.data);

      setUser(res.data.data);   // set full user object

    } catch (err) {
      console.log("PROFILE API ERROR:", err.response?.data || err.message);
      setError("Failed to load profile.");
    }
  };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  return (
    <div>
      <h1>Profile</h1>

      {/* Show error if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* If no user yet */}
      {!user && <h2>Nothing</h2>}

      {/* When user exists, render safely */}
      {user && (
        <div>
          <p><strong>ID:</strong> {user._id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>
          <p><strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>
        </div>
      )}

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>
        Details
      </button>
    </div>
  );
}