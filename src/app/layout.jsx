import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BlocksArt",
  description: "Exploring technology, development, and innovation through insightful articles and practical knowledge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header */}
        <Header />
        {children}
        <Toaster richColors closeButton position="top-right"/>
        {/* richColors makes success green and error red */}
        <Footer />
        {/* Footer */}
      </body>
    </html>
  );
}
