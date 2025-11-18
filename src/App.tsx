import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import BookingPage from "./components/BookingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
