//Category Menu
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  //Fetch the Category table used to display categories information
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch("https://localhost:7063/api/Categories");
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching Category Data:", error);
      }
    };

    fetchCategoryData();
  }, []);
  //Used to delete the record in the table
  async function deleteHandler(id: number) {
    console.log("click", id);
    const response = await fetch(
      `https://localhost:7063/api/Categories/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <><div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-3 text-left">Category Name</th>
            <th className="px-4 py-3 text-left">EDIT</th>
            <th className="px-4 py-3 text-left">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((i: any) => (
            <tr key={i.categoryId} className="border-t">
              <td className="px-4 py-2">{i.categoryName}</td>
              <td className="px-4 py-2">
                <Link
                  href={`/pages/Category/${i.categoryId}`}
                  className="text-blue-500 hover:underline"
                >
                  EDIT
                </Link>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteHandler(i.categoryId)}
                  className="text-red-500 hover:underline"
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center mt-4">
        <Link href="Category/Create">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
        </Link>
      </div>
    </div><Footer /></>
  );
};

export default Category;
