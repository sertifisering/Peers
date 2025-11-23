// Import dependencies
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts and pages
import MainLayout from "@layouts/MainLayout";
import MyEvents from "@pages/MyEvents";
// import CreateEvent from "@pages/createEvent";
// import EditEvent from "@pages/editEvent";
// import Presentation from "@pages/presentation";

function App() {

  // Initialization
  useEffect(() => {
    console.log("Initialization");
  }, []);

  return (
    <>
      <Routes>
        {/* Page with Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<MyEvents />} />
          {/* <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/:id/edit" element={<EditEvent />} /> */}
        </Route>

        {/* Page without layout */}
        {/* <Route path="/events/:id/presentation" element={<Presentation />} /> */}
      </Routes>
    </>
  );
}

export default App;
