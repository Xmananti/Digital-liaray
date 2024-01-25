"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const YourFormComponent = () => {
  const router = useRouter();
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [noOfBooks, setNoOfBooks] = useState("");
  const [category, setCategory] = useState("");
  const [existCategory, setExistCategory] = useState([]);
  useEffect(() => {
    fetch("https://localhost:7063/api/Categories")
      .then((response) => response.json())
      .then((data) => setExistCategory(data));
  }, []);
  console.log(existCategory);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7063/api/Books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookName,
          price,
          authorName,
          noOfBooks,
          CategoryId: category,
        }),
      });
      if (response.ok) {
        console.log("success");
        router.push("/pages/Book");
      }
    } catch (error) {}

    // Handle form submission logic here
  };
  console.log(category);
  return (
    <>
      <div className="container mx-auto mt-8">
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="bookName"
              className="block text-gray-700 font-bold mb-2"
            >
              Book Name
            </label>
            <input
              type="text"
              id="bookName"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="authorName"
              className="block text-gray-700 font-bold mb-2"
            >
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="noOfBooks"
              className="block text-gray-700 font-bold mb-2"
            >
              Number of Books
            </label>
            <input
              type="number"
              id="noOfBooks"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={noOfBooks}
              onChange={(e) => setNoOfBooks(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-gray-700 font-bold mb-2"
            >
              Category
            </label>
            <select
              name="CategoryName"
              id="Category"
              className="mb-4 p-2 border rounded w-full"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" className="bg-white">
                Select
              </option>
              {existCategory.map((i: any, e) => (
                <option key={e} value={i.categoryId} className="bg-white ">
                  {i.categoryName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Book
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default YourFormComponent;
