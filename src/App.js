import React, { useEffect } from "react";
import { Store } from "./Store";
const ListMovie = React.lazy(() => import("./ListMovie"));

export default function App() {
  const { state, dispatch } = React.useContext(Store);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const URL = "https://www.omdbapi.com/?apikey=4835b713&s=Batman";
    const data = await fetch(URL);
    const movieJson = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: movieJson.Search
    });
  };
  console.log(state.movies);
  const StyleLayout = {
    display: "flex",
    flexWrap: "wrap",
    background: "#fafafa"
  };
  const boxStyle = {
    padding: ".5rem",
    overflow: "hidden"
  };
  const toggleFavourites = movies => {
    let moveInfav = state.favourites.includes(movies);
    if (moveInfav) {
      const favMovie = state.favourites.filter(
        fav => fav.imdbID !== movies.imdbID
      );
      dispatch({
        type: "REMOVE_MOVIE",
        payload: favMovie
      });
    } else if (!moveInfav) {
      dispatch({
        type: "FAV_MOVIE",
        payload: movies
      });
    }
  };
  const props = {
    movies: state.movies,
    favourites: state.favourites,
    toggleFavourites,
    boxStyle
  };
  return (
    <React.Fragment>
      <div className="App">
        <h1>Hello Coder</h1>
        <h2>Start Movies to see on this weeks!</h2>
        <div>your favourites movies {state.favourites.length} Movies</div>
      </div>
      <section style={StyleLayout}>
        <React.Suspense fallback={<div>Loading please wait ...</div>}>
          <ListMovie {...props} />
        </React.Suspense>
      </section>
    </React.Fragment>
  );
}
