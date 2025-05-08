import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTrip from "./pages/AddTrip";
import DetailTrip from "./pages/DetailTrip";
import EditTrip from "./pages/EditTrip";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-trip" element={<AddTrip />} />
        <Route path="/detail-trip/:id" element={<DetailTrip />} />
        <Route path="/edit-trip/:id" element={<EditTrip />} />
      </Routes>
    </>
  );
};

export default App;
