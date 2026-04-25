import { useState } from "react";

import "./App.css";
import HeaderBar from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <div className="w-full fixed z-50">
        <HeaderBar />
      </div>
      <HomePage />
    </>
  );
}

export default App;
