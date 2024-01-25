// CategoryForm.jsx
"use client";
import Footer from "@/components/Footer";
import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryForm = ({ params }: any) => {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const res = await fetch(
          `https://localhost:7063/api/Categories/${params.slug}`
        );
        const categoryData = await res.json();
        setCreatedBy(categoryData.createdBy);
        setCategoryName(categoryData.categoryName);
        setCreatedDate(categoryData.createdDate);
      } catch (error) {}
    }
    fetchCategoryData();
  }, [params.slug]);
  useEffect(() => {
    async function tokenDetails() {
      const response = await fetch("/api/meToken");
      const data = await response.json();
      // console.log(data);
      setModifiedBy(data.name);
    }
    tokenDetails();
  }, []);
  const year = new Date().getFullYear();

  const month = new Date().getMonth() + 1; // Months are zero-indexed, so add 1
  const date = new Date().getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}`;

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const bookData = {
      categoryId: params.slug,
      categoryName,
      createdBy,
      createdDate,
      modifiedBy,
      modifiedDate: formattedDate,
    };
    //console.log(bookData);

    try {
      fetch(`https://localhost:7063/api/Categories/${params.slug}`, {
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
      router.push("/pages/Category");
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
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-600"
          >
            Book Name:
          </label>
          <input
            type="text"
            id="categoryName"
            name="bookName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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

export default CategoryForm;
