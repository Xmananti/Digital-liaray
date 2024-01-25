"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

export default function Book() {
  const router = useRouter();
  const [BookData, setBookData] = useState([]);
  //Fetch the Books data to display Books Information
  useEffect(() => {
    const response = fetch("https://localhost:7063/api/Books")
      .then((res) => res.json())
      .then((data) => setBookData(data));
  }, []);

  //Delete the record based on id
  async function deleteHandler(id: number) {
    console.log("click", id);
    const response = await fetch(`https://localhost:7063/api/Books/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      window.location.reload();
    } else {
      console.log(response.status);
    }
  }
  return (
    <><div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">Book Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Author Name</th>
              <th className="py-3 px-6 text-left">No. of Books</th>
              <th className="py-3 px-6 text-left">EDIT</th>
              <th className="py-3 px-6 text-left">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {BookData.map((i: any) => (
              <tr key={i.bookId} className="border-t">
                <td className="py-2 px-6 text-left">{i.bookName}</td>
                <td className="py-2 px-6 text-left">{i.price}</td>
                <td className="py-2 px-6 text-left">{i.authorName}</td>
                <td className="py-2 px-6 text-left">{i.noOfBooks}</td>
                {/* Update the Book table by using Edit */}
                <td className="py-2 px-6 text-left">
                  <Link
                    href={`/pages/Book/${i.bookId}`}
                    className="text-blue-500 hover:underline"
                  >
                    EDIT
                  </Link>
                </td>
                {/* Used to delete the record by using deleteHandler() */}
                <td className="py-2 px-6 text-left">
                  <button
                    onClick={() => deleteHandler(i.bookId)}
                    className="text-red-500 hover:underline"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        {/* Create button is used to Create new record in the Books table */}
        <Link href="Book/Create">
          <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded">
            Create
          </button>
        </Link>
      </div>
    </div><Footer /></>
  );
}
