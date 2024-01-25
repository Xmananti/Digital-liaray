"use client";

import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";

const ReturnBook = () => {
  const [userId, setUserId] = useState();
  const [booksTrans, setBooksTrans] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState();
  const [transId, setTransId] = useState();
  const [isReserved, setIsReserved] = useState(false);
  const [comments, setComment] = useState("");
  //Used to fetch the UserId from token
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("/api/meToken");
      const userData = await response.json();
      setUserId(userData.userId);
    }
    fetchUser();
  }, []);
  //Fetch the BookTrans table and filter the records based on the userId and Status=Issued
  //Issued books only display on the select box
  useEffect(() => {
    async function fetchBookTrans() {
      const response = await fetch("https://localhost:7063/api/BookTrans");
      const bookTrans = await response.json();
      setBooksTrans(
        bookTrans.filter(
          (i: any) => i.userId === userId && i.status === "Issued"
        )
      );
    }
    fetchBookTrans();
  }, [userId]);
  console.log(booksTrans);
  //fetch the records in the books table and stored in the books variable for update purpose
  useEffect(() => {
    if (booksTrans.length > 0) {
      booksTrans.forEach(async (i: any) => {
        const response =
          await fetch(`https://localhost:7063/api/Books/${i.bookId}
        `);
        const bookData = await response.json();

        setBooks((prv: any): any => {
          return [...prv, bookData];
        });
      });
    }
  }, [booksTrans]);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1; // Months are zero-indexed, so add 1
  const date = new Date().getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}`;
  // console.log(books);
  // console.log(booksTrans);
  function changeHandler(e: React.ChangeEvent) {
    const value = e.target.value;
    books.map((i: any) => {
      if (i.bookName === value) {
        setBookId(i.bookId);
      }
    });
  }
  // console.log(id);
  // console.log(bookId[0]);
  useEffect(() => {
    booksTrans.map((i: any) => {
      // console.log(bookId);
      if (i.bookId === bookId) {
        console.log(i.bookTranId);
        setTransId(i.bookTranId);
      }
    });
  }, [bookId]);
  // console.log(transId);
  // Update the BookTrans table with Status=Returned and Returned date
  async function submitHandler(event: React.MouseEvent) {
    event.preventDefault();
    const bookTransData = {
      bookTranId: transId,
      bookId: books.map((i: any) => i.bookId)[0],
      userId,
      issueDate: booksTrans[0].issueDate,
      returnedDate: formattedDate,
      status: "Returned",
      comments,
    };
    console.log(bookTransData);
    try {
      const response = await fetch(
        `https://localhost:7063/api/BookTrans/${bookTransData.bookTranId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookTransData),
        }
      );
      if (response.ok) {
        console.log("sent success");
        books.map((i: any) => {
          if (i.noOfBooks >= 0) {
            return i.noOfBooks++;
          }
        });
        console.log(books);
        //Update the records in the books table with +1 after user successfully returned
        const bookResponse = await fetch(
          `https://localhost:7063/api/Books/${bookTransData.bookId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(books[0]),
          }
        );
        if (response.ok) {
          console.log("sent success");
          setIsReserved(true);
        }
      }
    } catch (error) {}

    // console.log(bookId);
  }
  function closeModal() {
    setIsReserved(false);
    window.location.reload();
  }
  return (
    <><div className="p-4 w-80 mx-auto my-10">
      <form
        action=""
        onSubmit={submitHandler}
        className="flex flex-col  bg-slate-500 p-6 rounded-md shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Return Form</h2>
        <select
          name="book"
          id="book"
          className="p-2 border rounded block mx-auto mb-4 w-60"
          onChange={changeHandler}
        >
          <option value="" className="bg-white">
            Select
          </option>
          {books.map((i: any, e: number) => (
            <option key={e} value={i.bookName} className="bg-white">
              {i.bookName}
            </option>
          ))}
        </select>
        <p className="text-base font-normal text-black-900 my-2">Comment</p>

        <textarea
          name="comments"
          id="comments"
          cols="30"
          rows="3"
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Return
        </button>
      </form>
      {isReserved && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-xl font-semibold mb-4">Returned Successful</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div><Footer /></>
  );
};

export default ReturnBook;
