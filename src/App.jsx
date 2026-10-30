import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";

import Home from "./Components/Home/Home";
import MovieDetails from "./Components/MovieDetails";
import PersonDetails from "./Components/PersonDetails";

import LayoutforMovie from "./Components/Movies/LayoutforMovie";
import AllMovie from "./Components/Movies/AllMovie";
import TopRated from "./Components/Movies/TopRated";

import TVshowDetails from "./Components/TVshowDetails";
import Tvshow from "./Components/Tv shows/Tvshow";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route path="/movie" element={<LayoutforMovie />}>
          <Route index element={<AllMovie />} />
          <Route path="/movie/top-rated" element={<TopRated />} />
        </Route>

        <Route path="/tvshow" element={<Tvshow />} />

        <Route path="/movieDetails/:id" element={<MovieDetails />} />

        <Route path="/tvshowDetails/:id" element={<TVshowDetails />} />

        <Route path="/person/:id" element={<PersonDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
