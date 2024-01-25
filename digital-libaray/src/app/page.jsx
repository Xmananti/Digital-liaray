//Home Page
import React from "react";
import Footer from "@/components/Footer";
const Layout = () => {
  return (
    //Background Image for Home Page
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center fixed w-full"
      style={{
        backgroundImage:
          "url('https://burst.shopifycdn.com/photos/library-books.jpg?width=1000&format=pjpg&exif=0&iptc=0')",
      }}
    >
      {/* Text On BackGround Image */}
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Digital Library Management</h1>
        <h2 className="text-2xl">Welcome to Digital Library Management</h2>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
