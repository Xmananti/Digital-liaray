"use client";

import React, { useState } from "react";
import Link from "next/link";
import bcryptjs from "bcryptjs";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Function to Login Button
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      //Fetching User information by using username(get by form)
      const response = await fetch(
        `https://localhost:7063/api/Users/ByUserName/${username}`
      );
      const data = await response.json();

      //Compare the password which is exist in Users table
      const passwordMatch = await bcryptjs.compare(password, data.userPassword);

      if (passwordMatch) {
        //If password matched sent User Data to the API
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: data.userId,
              username,
              password,
              roleId: data.roleId,
              isLogin: true,
            }),
          });
          if (response.ok) {
            console.log("sent successful");

            router.push("/");
          } else {
            // Handle errors if the response status is not okay
            console.error("Error during login:", response.status);
            // Optionally handle specific error cases based on response status
          }
        } catch (error) {
          console.error("error during login:", error);
        }
      } else {
        alert("User Name and Password didn't matched");
      }
    } catch (error) {
      alert("User Name and Password didn't matched");
    }
    // Here you can perform further actions like sending this data to the server for authentication
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login Page</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          {/* Login button is used to submit the form and handle login function is executed */}
          <button className="w-full my-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Login
          </button>
          {/* If user didn't registered then user can easily navigate to Signup button  */}
          <Link href="/pages/signup">
            <button
              type="button"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Signup
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
