import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import View from "./components/View";
import ViewSingle from "./components/ViewSingle";
import EditJob from "./components/EditJob";
import ViewAll from "./components/ViewAll";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import TemporaryFormation from "./components/TemporaryFormation";
import CreateIpad from "./components/CreateIpad";
import ViewAllDrawings from "./components/ViewAllDrawings";
import ViewDrawing from "./components/ViewDrawing";
import EditDrawing from "./components/EditDrawing";

//import Test from "./components/Test";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/createIpad" element={<CreateIpad />} />
        <Route path="/view" element={<View />} />
        <Route path="/temporaryFormation" element={<TemporaryFormation />} />

        <Route
          path="/viewAll"
          element={
            <PrivateRoute>
              <ViewAll />
            </PrivateRoute>
          }
        />
        <Route path="/viewSingle/:id" element={<ViewSingle />} />
        <Route path="/editJob/:id" element={<EditJob />} />

        <Route path="/viewAllDrawings" element={<ViewAllDrawings />} />
        <Route path="/viewDrawing/:id" element={<ViewDrawing />} />
        <Route path="/editDrawing/:id" element={<EditDrawing />} />

        {/* <Route path="/viewSingle/:id" element={<ViewSingle />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
