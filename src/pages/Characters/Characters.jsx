import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// IMPORT DU STYLE
import "../Characters/Characters.css";

const Characters = ({ token, setToken }) => {
  const [personnages, setPersonnages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleToken = (id) => {
    try {
      // Cookies.remove("token");
      // setToken("");
      // console.log("TOKEN AVANT PARSE", token);
      const tokenArray = token ? JSON.parse(token) : [];
      //  JE LE MET EN PARSE POUR POUVOIR AVOIR UN FORMAT TAB POUR MON IF
      // console.log("APRES PARSE FAV CHARACTERE", tokenArray);

      if (!tokenArray.includes(id)) {
        tokenArray.push(id);

        const newTokenString = JSON.stringify(tokenArray);
        setToken(newTokenString);
        // console.log("APRES STRINGIFY", token);
      }
    } catch (error) {
      console.log("Token Handle catch >>>", error.response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://site--marvel-backend--kpzxpq4tbm7j.code.run/characters?skip=${
            (page - 1) * 100
          }&name=${query}`
        );

        setPersonnages(data.results);
      } catch (error) {
        console.log("Characters - catch", error.response);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [page, query]);
  return isLoading ? (
    <p>patientez</p>
  ) : (
    <main>
      {/* <p>{personnages}</p> */}
      <input
        type="text"
        placeholder="rechercher"
        onChange={(event) => {
          setPage(1);
          setQuery(event.target.value);
        }}
      />
      <button onClick={() => setPage((prev) => prev - 1)}>Précedent</button>
      <button onClick={() => setPage((prev) => prev + 1)}>suivant</button>
      <div className="listpersonnage">
        {personnages.map((personnage, index) => (
          <div key={personnage._id}>
            <Link to={`/comics/${personnage._id}`}>
              <div className="personnagecard">
                <div className="personnagenameandphoto">
                  <img
                    src={`${personnage.thumbnail.path}.${personnage.thumbnail.extension}`}
                    alt="Image des personnages Marvel"
                  />
                  <h1>{personnage.name}</h1>
                </div>
                <div className="personnagedescription">
                  {personnage.description ? (
                    <p>{personnage.description}</p>
                  ) : (
                    <p>pas de descritpion</p>
                  )}
                </div>
              </div>
            </Link>
            <button onClick={() => handleToken(personnage._id)}>
              ajouter aux favoris
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Characters;

{
  /* <div>
        {personnages[1].map((personnage) => {
          return <p>{personnage[1].name}</p>;
        })}
      </div> */
}
