// M26B13/019 KITUNZI ZION MUKISA - Feature 3: Advanced Search & Filters
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Pass filters to parent - parent filters products list
    onSearch({ query, category, minPrice, maxPrice });
  };

  return (
    <form onSubmit={handleSearch} style={{display:"flex", gap:8, flexWrap:"wrap", padding:10, background:"#f0f8f0"}}>
      <input placeholder="Search maize, beans..." value={query} onChange={e=>setQuery(e.target.value)} style={{padding:8, flex:1}} />
      <select value={category} onChange={e=>setCategory(e.target.value)} style={{padding:8}}>
        <option value="">All Categories</option>
        <option value="Crops">Crops</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Fruits">Fruits</option>
        <option value="Livestock">Livestock</option>
      </select>
      <input type="number" placeholder="Min UGX" value={minPrice} onChange={e=>setMinPrice(e.target.value)} style={{padding:8, width:110}} />
      <input type="number" placeholder="Max UGX" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} style={{padding:8, width:110}} />
      <button type="submit" style={{padding:"8px 16px", background:"green", color:"white"}}>🔍 Search</button>
    </form>
  );
}
