import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import FlightDetails from "./Pages/FlightDetails";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import FlightSearchForms from "./fligtSea";
import FlightInfo from "./FlightInfo";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/FlightDetails" element={<FlightDetails />} />
          <Route path="/test" element={<FlightInfo />} />

          <Route path="/flight" element={<FlightSearchForms />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
