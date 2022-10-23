import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Pagination/User";
import SingleUser from "./pages/SingleUser";
import Error404Page from "./pages/404";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users">
            <Route index element={<Users />} />
            <Route path=":userId" element={<SingleUser />} />
          </Route>
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
