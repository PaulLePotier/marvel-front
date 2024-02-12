import { Link } from "react-router-dom";
import "../components/Header.css";
import logoMarvel from "../img/LogoMarvel.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  return (
    <header>
      <img src={logoMarvel} alt="" />
      {/* TEST BARRE DE RECHERCE */}
      {/* <input
        type="text"
        placeholder="rechercher"
        onChange={(event) => {
          setPage(1);
          setQuery(event.target.value);
        }}
      />
      <button onClick={() => setPage((prev) => prev - 1)}>Précedent</button>
      <button onClick={() => setPage((prev) => prev + 1)}>suivant</button> */}
      {/* TEST BARRE DE RECHERCE - A FAIRE AVEC BOUT PLUS BAS*/}
      <div>
        <Link to="/">Personnage</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorites">Mes favoris</Link>
      </div>
    </header>
  );
};

export default Header;

// MANQUE DE TEMPS A FAIRE - TEST POUR METTRE LA BARRE DE RECHERCHE DANS LE HEADER

// const location = useLocation();

//   console.log("LOCATION - Header >>>", location.pathname);

//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState("");

//   if (location.pathname === "/comics") {
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const { data } = await axios.get(
//             `http://localhost:3000/comics?skip=${
//               (page - 1) * 100
//             }&title=${query}`
//           );
//           // console.log(data.results);
//           setData(data.results);
//         } catch (error) {
//           console.log("Comics - Page", error.response);
//         }
//         setIsLoading(false);
//       };

//       fetchData();
//     }, [page, query]);
//   } else {
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const { data } = await axios.get(
//             `http://localhost:3000/characters?skip=${
//               (page - 1) * 100
//             }&name=${query}`
//           );

//           setData(data.results);
//           // console.log("console log DATA PERSO", data.results);
//         } catch (error) {
//           console.log("Characters - catch", error.response);
//         }
//         setIsLoading(false);
//       };

//       fetchData();
//     }, [page, query]);
//   }
//   FIN DE TEST POUR METTRE LA BARRE DE RECHERCHE DANS LE HEADER
