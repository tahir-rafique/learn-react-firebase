import { BrowserRouter, Routes, Route } from "react-router-dom";
import Write from "./components/write";
import Read from "./components/read";
import UpdateRead from "./components/updateRead";
import Updatewrite from "./components/updateWrite";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Write />} />
          <Route path="/write" element={<Write />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update-read" element={<UpdateRead />} />
          <Route path="/update-write/:firebaseId" element={<Updatewrite />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
