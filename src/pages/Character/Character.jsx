import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// IMPORT CSS
import "../Character/Character.css";

const Character = () => {
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:3000/character/${id}`
          `http://localhost:3000/comics/${id}`
        );
        setCharacter(response.data);
      } catch (error) {
        console.log("CharactereComicsPage - catch >>", error.response);
      }
      setIsLoading(false);
      console.log("BDDDD", character);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>patientiez</p>
  ) : (
    <>
      <p>{character.name}</p>
      <div>
        {character.comics.map((comic) => {
          return (
            <main key={comic._id}>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt="Image de comics"
              />
              ;
            </main>
          );
        })}
      </div>
    </>
  );
};

export default Character;
