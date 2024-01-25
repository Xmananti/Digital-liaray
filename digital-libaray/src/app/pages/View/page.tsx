//View Issued Books and Issued to
"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
const ViewReservation = () => {
  const [bookTrans, setBookTrans] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});

  //Fetch BookTrans table and filter the records based on 'Issued' condition
  //And get BookId and UserId
  const [loginUserId, setLoginUserId] = useState();
  const [userRoleId, setUserRoleId] = useState();
  const [bookTransTable, setBookTransTable] = useState([]);
  useEffect(() => {
    async function tokenDetails() {
      const response = await fetch("/api/meToken");
      const data = await response.json();
      // console.log(data);

      setUserRoleId(data.roleId);
      setLoginUserId(data.userId);
    }
    tokenDetails();
  }, []);

  useEffect(() => {
    fetch("https://localhost:7063/api/BookTrans")
      .then((response) => response.json())
      .then((data) => setBookTrans(data));

    fetch("https://localhost:7063/api/Books")
      .then((response) => response.json())
      .then((data) => {
        const bookMapping = {};
        data.map((book) => {
          bookMapping[book.bookId] = book.bookName;
        });
        setBookDetails(bookMapping);
      });

    fetch("https://localhost:7063/api/Users")
      .then((response) => response.json())
      .then((data) => {
        const userMapping = {};
        data.map((user) => {
          userMapping[user.userId] = user.userName;
        });
        setUserDetails(userMapping);
      });
  }, []);

  //Used to fetch UserName by using UserId
  // console.log(bookTrans);
  useEffect(() => {
    if (userRoleId === 1) {
      // If userRoleId is 1, include all transactions
      setBookTransTable(
        bookTrans.map((trans, index) => ({
          bookName: bookDetails[trans.bookId],
          userName: userDetails[trans.userId],
          status: trans.status,
          issuedDate: trans.issueDate,
          returnedDate: trans.returnedDate,
          userId: loginUserId,
          comments: trans.comments,
        }))
      );
    } else {
      // If userRoleId is not 1, filter transactions based on loginUserId
      const filteredBookTrans = bookTrans
        .filter((trans) => trans.userId === loginUserId)
        .map((trans) => ({
          bookName: bookDetails[trans.bookId],
          userName: userDetails[trans.userId],
          status: trans.status,
          issuedDate: trans.issueDate,
          returnedDate: trans.returnedDate,
          userId: loginUserId,
          comments: trans.comments,
        }));

      setBookTransTable(filteredBookTrans);
    }
  }, [bookTrans, userRoleId, loginUserId, bookDetails, userDetails]);

  // console.log(bookTransTable);
  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Book Transactions</h2>

        <table className="min-w-full border rounded overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Book Name</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left">Issued Date</th>
              <th className="py-2 px-4 text-left">Returned Date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Comments</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {bookTransTable.map((trans, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
              >
                <td className="py-2 px-4 text-left">{trans.bookName}</td>
                <td className="py-2 px-4 text-left">{trans.userName}</td>
                <td className="py-2 px-4 text-left">{trans.issuedDate}</td>
                <td className="py-2 px-4 text-left">{trans.returnedDate}</td>
                <td className="py-2 px-4 text-left">{trans.status}</td>
                <td className="py-2 px-4 text-left">{trans.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default ViewReservation;
