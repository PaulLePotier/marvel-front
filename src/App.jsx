import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";
import "./App.css";
import "./assets/components/Header.css";
import Cookies from "js-cookie";

// IMPORT DES PAGES
import Comics from "./pages/Comics/Comics";
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import Favorites from "./pages/Favorites/Favorites";

//  IMPORT DE COMPOSANTS
import Header from "./assets/components/Header";

function App() {
  // TEST POUR METTRE LA BARRE DE RECHERCHE DANS LE HEADER
  // const [data, setData] = useState([]);
  // FIN DE TEST
  const [tokenFavoriteCharacter, setTokenFavoriteCharacter] = useState(
    Cookies.get("token") || ""
  );
  const [tokenFavoriteComics, setTokenFavoriteComics] = useState(
    Cookies.get("tokenFC") || ""
  );

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                token={tokenFavoriteCharacter}
                setToken={setTokenFavoriteCharacter}
              />
            }
          />
          <Route path="/comics/:id" element={<Character />} />
          <Route
            path="/comics"
            element={
              <Comics
                tokenFC={tokenFavoriteComics}
                setTokenFC={setTokenFavoriteComics}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                token={tokenFavoriteCharacter}
                tokenFC={tokenFavoriteComics}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
