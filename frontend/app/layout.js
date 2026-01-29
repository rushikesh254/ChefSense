
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"; // The little notification popups
import Image from "next/image"; 
import ClientLayout from "../components/wrappers/ClientLayout"; 
import Header from "../components/Header";
import Footer from "../components/Footer";




// Load the Modern "Inter" Font from Google
const inter = Inter({ subsets: ["latin"] });






export const metadata = {
  title: "ChefSense - AI Recipes Platform",
  description: "Cook anything with the power of AI",
};







export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning >


   <body className={`${inter.className}`} suppressHydrationWarning={true}>
          {/* 3. ClientLayout: A wrapper that helps with UI placement */}
          <ClientLayout header={<Header/>} footer={<Footer/> }>
            {/* 4. children: This is where the actual page content (like Landing or Dashboard) goes */}
            {children}
          </ClientLayout>
          
          {/* 5. Toaster: Shows success/error messages */}
          <Toaster richColors />
        </body>
    </html>
  );
}
