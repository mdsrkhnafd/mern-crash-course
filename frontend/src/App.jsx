import { lazy, Suspense } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const CreatePage = lazy(() => import("./pages/CreatePage.jsx"));

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;
