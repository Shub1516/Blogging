import React from "react";
import Container from "./Container";
import Image from "next/image";
import Navbar from "./Navbar/LoginBtn";
import SearchBar from "./Navbar/SearchBar";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-5">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-4 gap-4 md:gap-8">
          {/* Logo Section - Centers on mobile, Left-aligned on Desktop */}
          <div className="flex shrink-0">
            <Link href="/">
              <Image
                src="/Logo/Logo.png"
                width={140}
                height={40}
                alt="logo"
                className="w-28 md:w-36 h-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Search Bar - Full width on mobile, Flexible on Desktop */}
          <div className="w-full md:max-w-xl flex grow order-3 md:order-2">
            <SearchBar />
          </div>

          {/* Login/Navbar Section - Positioned top-right on mobile */}
          <div className="absolute top-3 right-4 md:static md:order-3">
            <Navbar />
          </div>
        </div>
      </Container>
    </header>
  );
}
