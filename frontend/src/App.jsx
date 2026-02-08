import React from "react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-700  ">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
