import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main style={{ paddingBottom: 32 }}>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/:title" element={<MovieDetails />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
