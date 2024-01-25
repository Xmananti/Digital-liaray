"use client";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";

function Reserve() {
  const [book, setBook] = useState([]);
  const [userId, setUserId] = useState();
  const [bookId, setBookId] = useState([]);
  const [isReserved, setIsReserved] = useState(false);
  // Getting the login UserId from api/metoken
  useEffect(() => {
    fetch("/api/meToken")
      .then((res) => res.json())
      .then((Data) => setUserId(Data.userId));
  }, []);
  //Fetching the Books table and get the Book names if no.of books>0
  useEffect(() => {
    async function fetchBookData() {
      try {
        const response = await fetch("https://localhost:7063/api/Books");
        const bookData = await response.json();
        // console.log(bookData);
        bookData.map((i: any) => {
          if (i.noOfBooks > 0 && i !== undefined) {
            setBook((prv: any): any => {
              return [...prv, i];
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchBookData();
  }, []);
  //console.log(book);
  //Used to get the user selected BookName
  function changeHandler(event: any) {
    const value = event.target.value;
    setBookId(
      book.filter((i: any) => {
        if (i.bookName === value) {
          return i.bookId;
        }
      })
    );
  }

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1; // Months are zero-indexed, so add 1
  const date = new Date().getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}`;
  //After clicked on Reserve button then New record will be created on BookTrans table as status is Issued
  async function submitHandler(event: React.MouseEvent) {
    event.preventDefault();
    const bookTrans = {
      bookid: bookId.map((i: any) => i.bookId)[0],
      userId,
      issueDate: formattedDate,
      status: "Issued",
    };

    try {
      const response = await fetch("https://localhost:7063/api/BookTrans", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookTrans),
      });
      //Update the Books table by decreasing count by -1 if 1 book is issued
      bookId.map((i: any) => {
        if (i.noOfBooks) {
          return i.noOfBooks--;
        }
      });
      const bookResponse = await fetch(
        `https://localhost:7063/api/Books/${bookTrans.bookid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookId[0]),
        }
      );
      setIsReserved(true);
    } catch (error) {
      console.log(error);
    }

    console.log(bookId);
  }
  function closeModal() {
    setIsReserved(false);
    window.location.reload();
  }

  return (
    <>
      <div className="p-4 w-80 mx-auto my-10">
        <form
          action=""
          className="flex flex-col  bg-slate-500 p-6 rounded-md shadow-md"
          onSubmit={submitHandler}
        >
          <h2 className="text-xl font-semibold mb-4">Reservation Form</h2>
          <select
            name="bookName"
            id="book"
            className="mb-4 p-2 border rounded"
            onChange={changeHandler}
          >
            <option value="" className="bg-white">
              Select
            </option>
            {book.map((i: any) => (
              <option key={i.bookId} value={i.bookName} className="bg-white">
                {i.bookName}
              </option>
            ))}
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Reserve
          </button>
        </form>
        {isReserved && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-md">
              <p className="text-xl font-semibold mb-4">
                Reservation Successful
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
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
}

export default Reserve;
