//IMPORT DU STYLE
import "../Favorites/Favorites.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Favorites = ({ token, tokenFC }) => {
  const tokenParse = token ? JSON.parse(token) : [];
  const tokenParseFC = tokenFC ? JSON.parse(tokenFC) : [];
  const [favoritecharacter, setFavoriteCharacter] = useState([]);
  const [favoritecomics, setFavoriteComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          tokenParse.map((id) =>
            axios.get(`http://localhost:3000/character/${id}`)
          )
        );
        setFavoriteCharacter(responses.map((response) => response.data));

        console.log("TOKEN COMICS PARSE", tokenParseFC);
        const responsesComics = await Promise.all(
          tokenParseFC.map((id) =>
            axios.get(`http://localhost:3000/comic/${id}`)
          )
        );
        setFavoriteComics(responsesComics.map((response) => response.data));
        console.log("CONSOLE FAVORITE COMICS", favoritecomics);
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
      setIsLoading(false);
    };
    console.log("FAVORITE", favoritecharacter);
    fetchData();
  }, [token, tokenFC]);
  //  JE LE MET EN PARSE POUR POUVOIR AVOIR UN FORMAT TAB POUR MON IF
  //   console.log("FAVORITE", tokenParse);

  return isLoading ? (
    <p>patientez</p>
  ) : (
    <main className="splitfavoritecard">
      <div className="favoritecharaters">
        <h1>Mes héros favoris</h1>
        {favoritecharacter.map((element, index) => {
          return (
            <div key={index}>
              <p>{element.name}</p>
              <img
                src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                alt="Image de comics"
              />
            </div>
          );
        })}
      </div>
      <div className="favoritecomics">
        <h1>Mes BD favorites</h1>
        {favoritecomics.map((comic, index) => {
          return (
            <div key={index}>
              <p>{comic.title}</p>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt="Image de comics"
              />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Favorites;
