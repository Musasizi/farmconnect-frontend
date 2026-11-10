// M26B13/019 KITUNZI ZION MUKISA - Feature 1: Favourites Page
import { useEffect, useState } from "react";
import axios from "axios";

export default function Favorites() {
  const [favs, setFavs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/favorites", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setFavs(res.data)).catch(err => console.log(err));
  }, []);

  const removeFav = async (id) => {
    await axios.delete(`http://localhost:5000/api/favorites/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFavs(favs.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>My Favourites ❤️</h2>
      {favs.length === 0 ? <p>No favourites yet. Tap heart on a product!</p> : null}
      {favs.map(p => (
        <div key={p.id} style={{border:"1px solid #ddd", padding:10, margin:10}}>
          <h3>{p.name}</h3>
          <p>UGX {p.price}</p>
          <button onClick={() => removeFav(p.id)}>Remove ❌</button>
        </div>
      ))}
    </div>
  );
}
