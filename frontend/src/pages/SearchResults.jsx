import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const SearchResults = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search).get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `https://mini-ecommerce-project-backend.onrender.com/api/products/search?q=${query}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Results for "{query}"</h2>
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      {loading ? (
        <p>Searching...</p>
      ) : results.length > 0 ? (
        <div className="row">
          {results.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p>No matching products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
