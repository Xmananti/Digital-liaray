"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const YourFormComponent = () => {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");
  const [existCategory, setExistCategory] = useState([]);
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedby, setModifiedBy] = useState("");
  const [isExist, setExist] = useState(false);
  const year = new Date().getFullYear();

  const month = new Date().getMonth() + 1; // Months are zero-indexed, so add 1
  const date = new Date().getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}`;
  useEffect(() => {
    async function tokenDetails() {
      const response = await fetch("/api/meToken");
      const data = await response.json();
      console.log(data);

      setCreatedBy(data.name);
    }
    tokenDetails();
  }, []);
  useEffect(() => {
    fetch("https://localhost:7063/api/Categories")
      .then((response) => response.json())
      .then((data) =>
        data.map((i) => {
          setExistCategory((prev: any) => [...prev, i.categoryName]);
        })
      );
  }, []);
  // console.log(existCategory);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!existCategory.includes(`${categoryName}`)) {
      try {
        const response = await fetch("https://localhost:7063/api/Categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryName,
            createdBy,
            createdDate: formattedDate,
          }),
        });
        if (response.ok) {
          console.log("success");
          router.push("/pages/Category");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("false");
      setExist(true);
    }

    setCategoryName("");
    // Handle form submission logic here
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-gray-700 font-bold mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Category
          </button>
        </form>
        {isExist && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-md">
              <p className="text-xl font-semibold mb-4">Already Exists</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setExist(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default YourFormComponent;
