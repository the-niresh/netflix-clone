import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("error in getTrendingMovie", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, trilers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      console.error("error in getMovieTrailers", error);
      res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      console.error("error in getMovieDetails", error);
      res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      console.log("error in getMoviesByCategory", error);
      res.status(404).send(null);
    }
    console.log("error in getMoviesByCategory", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
