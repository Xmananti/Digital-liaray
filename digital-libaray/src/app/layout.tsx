// Import necessary modules and types
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

// Import UserContext
import { Provider } from "react-redux";
import { makeStore } from "@/app/GlobalStore/store";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>DIGITAL LIBRARY</title>
      </head>
      <body>
        <Provider store={makeStore}>
          <NavBar />

          {children}
        </Provider>
      </body>
    </html>
  );
}
