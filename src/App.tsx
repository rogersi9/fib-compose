
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Fibonacci from "./pages/fibonacci";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Fibonacci />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
