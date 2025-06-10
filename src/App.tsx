import { useState } from "react";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecentPage from "./pages/RecentPage";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import EditorPage2 from "./pages/Editor2";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recent" element={<RecentPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditorPage />} />
          <Route path="/edit2" element={<EditorPage2 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
