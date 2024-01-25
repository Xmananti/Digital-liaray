// BookForm.jsx
"use client";

import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BookForm = ({ params }) => {
  const router = useRouter();
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [noOfBooks, setNoOfBooks] = useState("");

  useEffect(() => {
    async function fetchBookData() {
      try {
        const res = await fetch(
          `https://localhost:7063/api/Books/${params.slug}`
        );
        const BookData = await res.json();
        console.log(BookData);
        setBookName(BookData.bookName);
        setPrice(BookData.price);
        setAuthorName(BookData.authorName);
        setNoOfBooks(BookData.noOfBooks);
      } catch (error) {}
    }
    fetchBookData();
  }, [params.slug]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookData = {
      bookId: params.slug,
      bookName,
      price,
      authorName,
      noOfBooks,
    };
    // console.log(bookData);

    try {
      fetch(`https://localhost:7063/api/Books/${params.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Data Sent successful");
          } else {
            throw new Error("sent Failed");
          }
        })
        .then((data) => console.log(data));
      router.push("/pages/Book");
    } catch (error) {
      console.log(error);
    }

    // Perform actions with form data, such as sending it to the server

    // Reset form fields if needed
  };

  return (
    <>
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="bookName"
            className="block text-sm font-medium text-gray-600"
          >
            Book Name:
          </label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="authorName"
            className="block text-sm font-medium text-gray-600"
          >
            Author Name:
          </label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="noOfBooks"
            className="block text-sm font-medium text-gray-600"
          >
            Number of Books:
          </label>
          <input
            type="number"
            id="noOfBooks"
            name="noOfBooks"
            value={noOfBooks}
            onChange={(e) => setNoOfBooks(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default BookForm;
