import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.jpg"; // Make sure this exists!

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <div className="banner-wrapper">
        <div
          className="hero-banner"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-center text-white">
            <h1 className="display-4 fw-bold">Discover Your Essentials</h1>
            <p className="lead">
              Shop smarter with quality products at unbeatable prices.
            </p>
            <Link to="/allproducts" className="btn btn-light btn-lg mt-3">
              Browse Products
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <section className="py-5 bg-white border-bottom text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <i className="bi bi-truck fs-2 text-primary"></i>
              <h5 className="mt-3">Fast Delivery</h5>
              <p>Get your orders delivered within 48 hours across Nepal.</p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-shield-lock fs-2 text-success"></i>
              <h5 className="mt-3">Secure Payments</h5>
              <p>100% secure payment gateways for peace of mind.</p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-box-seam fs-2 text-warning"></i>
              <h5 className="mt-3">Easy Returns</h5>
              <p>Hassle-free returns within 7 days of purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5 bg-light">
        <div className="container">
          <h3 className="text-center mb-4">Popular Categories</h3>
          <div className="row g-4">
            <div className="col-md-4">
              <Link to="/category/Electronics" style={{textDecoration: "none"}}>
                <div className="category-card text-center p-4 shadow-sm bg-white">
                  <i className="bi bi-phone fs-1 text-info"></i>
                  <h5 className="mt-2">Electronics</h5>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/category/Clothing" style={{textDecoration: "none"}}>
                <div className="category-card text-center p-4 shadow-sm bg-white">
                  <i className="bi bi-person-standing fs-1 text-danger"></i>
                  <h5 className="mt-2">Clothing</h5>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/category/Groceries" style={{textDecoration: "none"}}>
                <div className="category-card text-center p-4 shadow-sm bg-white">
                  <i className="bi bi-basket fs-1 text-warning"></i>
                  <h5 className="mt-2">Groceries</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
