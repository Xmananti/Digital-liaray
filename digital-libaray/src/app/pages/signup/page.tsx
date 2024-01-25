"use client";

import React, { useState } from "react";
import Link from "next/link";
import bcryptjs from "bcryptjs";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Function to Signup button
  async function handleSignup(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${date
      .toString()
      .padStart(2, "0")}`;

    //Encrypting the password

    const salt = await bcryptjs.genSalt(1);
    const hashPassword = await bcryptjs.hash(password, salt);
    //Json Data get by form used to create new user
    const data = {
      userName: username,
      userPassword: hashPassword,
      roleId: 3,
      createdBy: username,
      createdDate: formattedDate,
      modifiedby: username,
      modifiedDate: formattedDate,
    };
    //Created New User Data in 'Users' table using 'POST' method
    try {
      const response = await fetch("https://localhost:7063/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      router.push("/pages/login");
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    //Form to get User Data for Signup
    <div>
      <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* SignUp button to Create New User */}
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Signup
          </button>

          {/* If user already registered/signup can simply navigate to Login Page */}
          <Link href="/pages/login">
            <button
              type="button"
              className="w-full my-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
