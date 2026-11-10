// M26B13/019 KITUNZI ZION MUKISA - Feature 2: Reviews & Ratings
import { useEffect, useState } from "react";
import axios from "axios";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/reviews/product/${productId}`)
      .then(res => setReviews(res.data)).catch(()=>{});
  }, [productId]);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reviews",
        { product_id: productId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review added!");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Failed - you may have already reviewed");
    }
  };

  return (
    <div style={{marginTop:20}}>
      <h3>⭐ Reviews ({reviews.length})</h3>
      {reviews.map(r => (
        <div key={r.id} style={{borderBottom:"1px solid #eee", padding:8}}>
          <b>{r.name}</b> - {"⭐".repeat(r.rating)} ({r.rating}/5)
          <p>{r.comment}</p>
        </div>
      ))}
      <form onSubmit={submitReview}>
        <select value={rating} onChange={e=>setRating(Number(e.target.value))}>
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Good</option>
          <option value={3}>3 - Average</option>
          <option value={2}>2 - Poor</option>
          <option value={1}>1 - Bad</option>
        </select>
        <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write review..." required style={{margin:5, padding:8, width:"60%"}} />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
