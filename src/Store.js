import React, { useReducer } from "react";

const initialState = {
  movies: [],
  favourites: []
};

export const Store = React.createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        movies: action.payload
      };
    case "FAV_MOVIE":
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    case "REMOVE_MOVIE":
      return {
        ...state,
        favourites: action.payload
      };
    default:
      return state;
  }
}
export function ProviderStore(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
