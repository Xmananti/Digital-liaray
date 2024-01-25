//Created DashBoard with Total Number of Users,Categories,Books Issued and Books Returned
"use client";
import Footer from "@/components/Footer";
import React from "react";
import { useState, useEffect } from "react";

const DashBoard = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  //Used to fetch users table and calculate total no of users
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch("https://localhost:7063/api/Users");
        const data = await response.json();
        setTotalUsers(data.length);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };
    fetchTotalUsers();
  }, []);
  //Used to fetch Categories table and calculate total no.of Categories
  const [totalCategories, setTotalCategories] = useState(null);
  useEffect(() => {
    const fetchTotalCategories = async () => {
      try {
        const response = await fetch("https://localhost:7063/api/Categories");
        const data = await response.json();

        setTotalCategories(data.length);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };
    fetchTotalCategories();
  }, []);
  //Used to fetch BookTrans table and calculate total Issued and Returned
  const [totalIssued, setTotalIssued] = useState();
  const [totalReturned, setTotalReturned] = useState();
  useEffect(() => {
    const fetchTotalIssuedReturned = async () => {
      try {
        const response = await fetch("https://localhost:7063/api/BookTrans");
        const data = await response.json();

        setTotalIssued(data.filter((i: any) => i.status === "Issued").length);
        setTotalReturned(
          data.filter((i: any) => i.status === "Returned").length
        );
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };
    fetchTotalIssuedReturned();
  }, []);
  //Return and display Total number of users, categories, Books Issued and Returned
  return (
    <>
      <div className="container mx-auto p-8">
        <header>
          <h1 className="text-4xl font-bold mb-4">DashBoard</h1>
        </header>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 rounded shadow">
            <h2 className="text-xl mb-2 font-semibold">
              Total Number Of Users
            </h2>
            <p className="text-gray-600">{totalUsers}</p>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow">
            <h2 className="text-xl mb-2 font-semibold">
              Total Number Of Categories
            </h2>
            <p className="text-gray-600">{totalCategories}</p>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow">
            <h2 className="text-xl mb-2 font-semibold">
              Total Number of Books Issued
            </h2>
            <p className="text-gray-600">{totalIssued}</p>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow">
            <h2 className="text-xl mb-2 font-semibold">
              Total Number of Books Returned
            </h2>
            <p className="text-gray-600">{totalReturned}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashBoard;
