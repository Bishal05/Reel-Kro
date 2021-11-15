import './App.css';
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import {BrowserRouter} from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Login></Login>
        {/* <Signup></Signup> */}
      </BrowserRouter>
    </>
  );
}

export default App;
