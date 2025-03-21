"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="background-light900_dark200 h-screen w-full flex flex-col justify-between items-center ">
      <Navbar />
      <div className="w-full flex items-center justify-center flex-col h-full mt-12">
        <p className="h2-bold text-primary-500 mb-8">Page Not Found</p>

        <p className="paragraph-regular text-dark-500 mb-8">
          We could not find the page you were looking for.
        </p>
        <Link href="/user/dashboard">
          <Button className="bg-primary-500 text-light-800">
            Go back to Home
          </Button>
        </Link>
      </div>
      <div className="background-light850_dark100 bg-red-500 w-full">
        <Footer />
      </div>
    </main>
  );
};

export default NotFound;
