import { useState, useEffect } from "react";
import axios from "axios";

//IMPORT DU STYLE
import "../Comics/Comics.css";
const Comics = ({ tokenFC, setTokenFC }) => {
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  const handleToken = (id) => {
    try {
      // Cookies.remove("tokenFC");
      // setToken("");
      // console.log("TOKEN AVANT PARSE", tokenFC);
      const tokenArray = tokenFC ? JSON.parse(tokenFC) : [];
      //  JE LE MET EN PARSE POUR POUVOIR AVOIR UN FORMAT TAB POUR MON IF
      //   console.log("APRES PARSE", tokenArray);

      if (!tokenArray.includes(id)) {
        tokenArray.push(id);

        const newTokenString = JSON.stringify(tokenArray);
        setTokenFC(newTokenString);
        // console.log("APRES STRINGIFY", tokenFC);
        // console.log("TOKEN FC>>>", tokenFC);
      }
    } catch (error) {
      console.log("Token Handle catch >>>", error.response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://site--marvel-backend--kpzxpq4tbm7j.code.run/comics?skip=${
            (page - 1) * 100
          }&title=${query}`
        );
        // console.log(data.results);
        setComics(data.results);
      } catch (error) {
        console.log("Comics - Page", error.response);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [page, query]);

  return isLoading ? (
    <p>Patientez </p>
  ) : (
    <main>
      <input
        type="text"
        placeholder="rechercher un comics"
        onChange={(event) => {
          setPage(1);
          setQuery(event.target.value);
        }}
      />
      <button onClick={() => setPage((prev) => prev - 1)}>Précedent</button>
      <button onClick={() => setPage((prev) => prev + 1)}>suivant</button>
      <div className="comics">
        {comics.map((comic) => {
          return (
            <main key={comic._id} className="comicscard">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt="Image des comics"
              />
              <div>
                <p>{comic.title}</p>
                <p>{comic.description}</p>
              </div>
              <button onClick={() => handleToken(comic._id)}>
                ajouter aux favoris
              </button>
            </main>
          );
        })}
      </div>
    </main>
  );
};

export default Comics;
